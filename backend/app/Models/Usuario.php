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

    public static function UsuarioDesdeServicio(int $rpe, string $contraseña): ?Usuario
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

            $array = ["key_sw" => "252D-2A23-461E7976ABD0", "rpe_usuario" => '292363', "contrasena" => 'Minerva#118'];

            $resultado = $client->valida_usuario($array);
            $xml = (simplexml_load_string($resultado->valida_usuarioResult->any));

            if (count($xml->NewDataSet->TablaMensaje) == 1)
            {
                $lista = $xml->NewDataSet->TablaMensaje[0];
                if ($lista->validacion == 'USUARIO-VALIDO')
                {
                    $usuario = new Usuario();
                    $usuario->rpe = $lista->rpe_usuario->__toString();
                    $usuario->nombre = $lista->nombre->__toString();
                    $usuario->apellido = '';
                    $usuario->email = $lista->correo_electronico->__toString();
                    return $usuario;
                } else return null;
            } else return null;
        } catch (\SoapFault $e) {
            return null;
        }
    }
}
