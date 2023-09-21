<?php
// Conecta a la base de datos (reemplaza con tus credenciales)
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$database = "tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $database);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Obtiene los datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Consulta SQL para verificar las credenciales
$sql = "SELECT * FROM usuarios WHERE nombre_usuario = '$username' AND contraseña = '$password'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    // IUsuario autenticado con éxito, redirige a la página de inicio
    header("Location: inicio.php");
} else {
    // Autenticación fallida, muestra un mensaje de error
    echo "IUsuario o contraseña incorrectos.";
}

// Cierra la conexión a la base de datos
$conn->close();
?>
