<?php

namespace App\Models;

use App\Enums\TipoUsuarioEnum;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use SoapClient;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    public $timestamps = false;
    protected $table = 'usuario';
    protected $fillable = ['nombre', 'apellido', 'tipo', 'email', 'permisos', 'rpe', 'contraseña'];
    protected $casts = [
        'nombre' => 'string',
        'apellido' => 'string',
        'tipo' => TipoUsuarioEnum::class,
        'email' => 'string',
        'permisos' => 'array',
        'rpe' => 'integer',
        'contraseña' => 'hashed'
    ];
    protected $hidden = ['contraseña'];

    public function getAuthPassword()
    {
        return $this->contraseña;
    }

    public static function UsuarioDesdeServicio(int $rpe): ?Usuario
    {
        try {
            // instancia un nuevo cliente del servicio de la UASLP
            $client = new SoapClient(
                "https://servicios.ing.uaslp.mx/ws_agenda/ws_agenda.svc?wsdl",
                [
                    'cache_wsdl'     => WSDL_CACHE_NONE,
                    'trace'          => 1,

                    'stream_context' => stream_context_create(
                        [
                            'ssl' => [
                                'verify_peer'       => false,
                                'verify_peer_name'  => false,
                                'allow_self_signed' => true
                            ]
                        ]
                    )
                ]
            );

            $array = ["" => "252D-2A23-461E7976ABD0", "rpe_usuario" => 292363, "contrasena" => "123456"];

            $respuesta = $client->valida_usuario($array);

            dd(simplexml_load_string($respuesta->valida_usuarioResult->any));

            // si el servicio devolvió un resultado crea un nuevo usuario de nuestro sistema con los atributos que
            // devolvió el servicio
            if (count($respuesta) > 0) {
                $usuario_servicio = $respuesta[0];
                $usuario_sistema = new Usuario();
                $usuario_sistema->rpe = $rpe;
                $usuario_sistema->nombre = explode(' ', $usuario_servicio->name)[0];
                $usuario_sistema->apellido = explode(' ', $usuario_servicio->name)[1];
                $usuario_sistema->email = $usuario_servicio->email;

                // retorna una instancia de usuario de nuestro sistema
                return $usuario_sistema;
            } else return null;
        } catch (\SoapFault $e) {
            dd($e->getMessage());
        }
    }

    public static function ValidaUsuarioServicio(int $rpe, string $contraseña): bool
    {
        try {
            // $usuario = Http::get('http://servicio.com?rpe=123456');
            $client = new Client();
            // con el último dígito del rpe se busca el usuario en jsonplaceholder
            // cuando se tenga el servicio se reemplazará por el valor del rpe directamente
            $usuario_service_rpe = intval(((string)$rpe)[5]) + 1;
            // Realiza la petición (concatena la contraseña...) de momento solo usa el rpe
            $respuesta = json_decode($client
                ->get('https://jsonplaceholder.typicode.com/users?id=' . $usuario_service_rpe)
                ->getBody()->getContents()
            );

            if (count($respuesta) > 0) {
                return true;
            } else return false;
        } catch (GuzzleException $ex) {
            return false;
        }
    }
}
