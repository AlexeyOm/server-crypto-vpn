let shell = require('shelljs')

async function generate(name) {
  shell.config.verbose = true;  
  try{
		shell.cd(`/etc/openvpn/easy-rsa/`);  	
		shell.exec(`./easyrsa build-client-full ${name} nopass`);
		shell.exec(`cp /etc/openvpn/client-common.txt /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "<ca>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`cat /etc/openvpn/easy-rsa/pki/ca.crt >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "</ca>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "<cert>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`cat /etc/openvpn/easy-rsa/pki/issued/${name}.crt >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "</cert>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "<key>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`cat /etc/openvpn/easy-rsa/pki/private/${name}.key >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "</key>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "<tls-auth>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`cat /etc/openvpn/ta.key >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);
		shell.exec(`echo "</tls-auth>" >> /home/server-crypto-vpn/ovpns/${name}.ovpn`);



  } catch(e) {
  	console.log(e);
  }

  /*
  let result = shell.exec(`printf 'access tokens will be here ${name}' > './ovpns/${name}'`);
    
	cd /etc/openvpn/easy-rsa/
	./easyrsa build-client-full $CLIENT nopass
	# Generates the custom client.ovpn
	newclient "$CLIENT"


	cp /etc/openvpn/client-common.txt ~/$1.ovpn
	echo "<ca>" >> ~/$1.ovpn
	cat /etc/openvpn/easy-rsa/pki/ca.crt >> ~/$1.ovpn
	echo "</ca>" >> ~/$1.ovpn
	echo "<cert>" >> ~/$1.ovpn
	cat /etc/openvpn/easy-rsa/pki/issued/$1.crt >> ~/$1.ovpn
	echo "</cert>" >> ~/$1.ovpn
	echo "<key>" >> ~/$1.ovpn
	cat /etc/openvpn/easy-rsa/pki/private/$1.key >> ~/$1.ovpn
	echo "</key>" >> ~/$1.ovpn
	echo "<tls-auth>" >> ~/$1.ovpn
	cat /etc/openvpn/ta.key >> ~/$1.ovpn
	echo "</tls-auth>" >> ~/$1.ovpn

*/

    return await 5;
}


    


module.exports = generate;