$lines = Get-Content .\fjalet.json -Encoding utf8

$lines = $lines | sort

$newlines = @()

cls

for ($i = 0; $i -lt $lines.Count-2; $i++) {
    $l0 = $lines[$i]
    $l1 = $lines[$i+1]

    $k0 = (Select-String  '".+?"' -input $l0 -AllMatches).Matches
    $k1 = (Select-String  '".+?"' -input $l1 -AllMatches).Matches

    

    $newlines += $l0

    if(($k0[0].Value -eq $k1[0].Value) -and ($k0[1].Value -eq $k1[1].Value)){
        $i += 1
    }
    

    
}

$newlines


