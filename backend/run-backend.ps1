$ErrorActionPreference = "Stop"

$javaHome = "C:\Program Files\Java\jdk-22"

if (-not (Test-Path "$javaHome\bin\java.exe")) {
    throw "No se encontro Java en $javaHome. Instala JDK 17 o superior, o cambia la ruta en este script."
}

$env:JAVA_HOME = $javaHome
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

Write-Host "Usando JAVA_HOME=$env:JAVA_HOME"
mvn spring-boot:run
