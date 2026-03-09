# dnsサーバ構築手順

Linuxのコンテナにサーバーを構築する想定

## dnsサーバー

1. 必要パッケージのインストール

``` text
> sudo dnf -y install bind bind-utils
```

インストール後、/etc/named.conf が生成されます。
※ubuntuだとbind9

2. 基本設定（/etc/named.conf, /etc/bind/named.conf）

listen-on port 53: サーバが受け付けるIPアドレスを指定
allow-query: 問い合わせを許可するネットワークを指定
zone設定: 正引き・逆引きゾーンファイルのパスを指定

例:

``` text
options {
listen-on port 53 { 127.0.0.1; 192.168.1.100; };    // { any; }だとすべて
allow-query { localhost; 192.168.1.0/24; };         // { any; }だとすべて
directory "/var/named";                             // なかったりする
};

zone "example.local" IN {
type master;
file "example.local.zone";
};

zone "1.168.192.in-addr.arpa" IN {
type master;
file "1.168.192.in-addr.arpa.zone";
};
```

3. ゾーンファイル作成

正引き:

``` text
$TTL 1D
@ IN SOA ns1.example.local. admin.example.local. (
1 1D 1H 1W 3H )
IN NS ns1.example.local
ns1 IN A 192.168.1.100
www IN A 192.168.1.10
```

逆引き:

``` text
$TTL 1D
@ IN SOA ns1.example.local. admin.example.local. (
1 1D 1H 1W 3H )
IN NS ns1.example.local
10 IN PTR www.example.local
```

4. サービス起動と自動起動設定

``` text
sudo systemctl enable --now named
sudo systemctl status named
```

4.1. 手動起動

``` text
named -g -c /etc/bind/named.conf -u bind  #フォアグラウンド
namde -c /etc/bind/named.conf -u bind     #バックグラウンド
```

5. クライアント設定（/etc/resolv.conf）

``` text
search example.local
nameserver 192.168.1.100
```

6. 動作確認

``` text
dig @192.168.1.100 www.example.local
dig -x 192.168.1.10
```

正しい応答が返れば構築成功です。

ベストプラクティス

ファイアウォールでTCP/UDPの53番ポートを開放
named-checkconf や named-checkzoneで事前検証
冗長化のためセカンダリDNSも構築すると信頼性向上

## WSL上の場合のWindows側設定

### DNSサーバー構築手順(コンテナ)

#### 10053ポートのまま

##### Windowsファイアウォールでポート53を許可(必要)

``` text
New-NetFirewallRule -DisplayName "DNS Server UDP 10053" -Direction Inbound -Protocol UDP -LocalPort 10053 -Action Allow
New-NetFirewallRule -DisplayName "DNS Server TCP 10053" -Direction Inbound -Protocol TCP -LocalPort 10053 -Action Allow
```

##### WSL2のミラードネットワークモードを使う

Windows側で %USERPROFILE%\.wslconfig ファイルを作成（または編集）してください。

PowerShellで実行：

``` text
@"
[wsl2]
networkingMode=mirrored
"@ | Out-File -FilePath "$env:USERPROFILE\.wslconfig" -Encoding utf8
```

その後：

``` text
wsl --shutdown
```

○WSLを再起動すると、WSLがWindows側と同じIPアドレスを共有するようになるため、外部PCから直接アクセスできるようになります。

WSL再起動後の手順：

コンテナを再起動：

``` text
docker run -it --rm --name testserver -p 10053:53/tcp -p 10053:53/udp testserver
```

外部PCから：dig @192.168.1.47 -p 10053 kbssig-t.ap.homealsok.jp
注意: ミラードモードはWindows 11 22H2以降で利用可能です。Windowsバージョンが古い場合は使えません。バージョンは winver で確認できます。

##### 後片付け(不要になったとき)

``` text
Remove-NetFirewallRule -DisplayName "DNS Server UDP 10053"
Remove-NetFirewallRule -DisplayName "DNS Server TCP 10053"
```


##### ★不要なもの

- WSLのIPを取得

``` text
$wslIp = (wsl hostname -I).Trim().Split(" ")[0]
# ポートフォワード設定(結局やらなくてよさそう。)
netsh interface portproxy add v4tov4 listenport=53 listenaddress=0.0.0.0 connectport=10053 connectaddress=$wslIp
New-NetFirewallRule -DisplayName "DNS Server" -Direction Inbound -Protocol TCP -LocalPort 53 -Action Allow
New-NetFirewallRule -DisplayName "DNS Server UDP" -Direction Inbound -Protocol UDP -LocalPort 53 -Action Allow
```

- 後片付け

``` text
netsh interface portproxy delete v4tov4 listenport=53 listenaddress=0.0.0.0
Remove-NetFirewallRule -DisplayName "DNS Server"
Remove-NetFirewallRule -DisplayName "DNS Server UDP"
```

## 参考

[【BIND入門実践】BINDでDNSサーバーを構築してみよう](https://envader.plus/article/213)