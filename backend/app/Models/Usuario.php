<?php

namespace App\Models;

use App\Enums\TipoUsuarioEnum;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Model
{
    use HasApiTokens, HasFactory, HasRoles;

    public $timestamps = false;
    protected $table = 'usuario';
    protected $fillable = ['nombre','apellido', 'tipo', 'email', 'permisos', 'rpe', 'contraseña'];
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

    public static function UsuarioDesdeServicio (int $rpe): ?Usuario
    {
        try {
            // $usuario = Http::get('http://servicio.com?rpe=123456');
            $client = new Client();
            // con el último dígito del rpe se busca el usuario en jsonplaceholder
            // cuando se tenga el servicio se reemplazará por el valor del rpe directamente
            $usuario_service_rpe = intval(((string)$rpe)[5]) + 1;
            // Realiza la petición y decodifica la respuesta en un objeto json
            $respuesta = json_decode($client
                ->get('https://jsonplaceholder.typicode.com/users?id=' . $usuario_service_rpe)
                ->getBody()->getContents()
            );

            if (count($respuesta) > 0) {
                $usuario_servicio = $respuesta[0];
                $usuario_sistema = new Usuario();
                $usuario_sistema->rpe = $rpe;
                $usuario_sistema->nombre = explode(' ', $usuario_servicio->name)[0];
                $usuario_sistema->apellido = explode(' ', $usuario_servicio->name)[1];
                $usuario_sistema->email = $usuario_servicio->email;

                return $usuario_sistema;
            } else return null;
        } catch (GuzzleException $ex) {
            return null;
        }
    }

    /*
    public function eventos()
    {
        return $this->hasMany(Evento::class, 'usuario_id');
    }
    */
}
