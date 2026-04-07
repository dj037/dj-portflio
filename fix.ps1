$badText = [System.IO.File]::ReadAllText("$PWD\tuorui\index.html", [System.Text.Encoding]::UTF8)
$gbkBytes = [System.Text.Encoding]::GetEncoding(936).GetBytes($badText)
$goodText = [System.Text.Encoding]::UTF8.GetString($gbkBytes)
[System.IO.File]::WriteAllText("$PWD\tuorui\index.html", $goodText, [System.Text.Encoding]::UTF8)
