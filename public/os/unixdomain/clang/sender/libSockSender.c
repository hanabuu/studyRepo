/*
 * libUdp.c
 *
 *  Created on: 2025/04/15
 *      Author: hanabusa
 */

#include "testSockSender.h"

int sock;

/* グローバル関数 */
//==========================================================
/**
 * @brief		#～# UDP電文送信
 * @param		address [in] IPアドレス
 * @param		port [in] ポート番号
 * @param		broadcast [in] ブロードキャスト用か？（true:ブロードキャスト用、false:ユニキャスト用、省略時:false）
 * @param		data [in] 送信データ
 * @param		len [in] 送信長
 * @return		処理結果
 * @retval		0	正常
 * @retval		-1	ソケットオープン失敗
 * @retval		-2	ソケット設定失敗
 * @retval		-3	送信失敗
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
int sendDgram(const char* sock_path, const uint8_t* data, int len){
	int ret = 0;
	int opt = -1;
	int sendedLen = 0;
 	struct sockaddr_un sun;
 	memset(&sun, 0, sizeof(sun));

	socklen_t socklen = sizeof(sun);

	sock = socket(AF_LOCAL, SOCK_STREAM, 0);
	if(sock < 0){
		printf("ソケットオープン失敗\n");
		return -1;
	}

	sun.sun_family = AF_LOCAL;               // UNIXドメイン
	strcpy(sun.sun_path, sock_path);  // UNIXドメインソケットのパスを指定

	ret = connect(sock, (const struct sockaddr *)&sun, sizeof(sun));
	if(ret < 0){
		printf("ソケット接続失敗 %d\n", ret);
		close(sock);
		return -1;
	}

	// UNIXドメインソケット(SCOK_STREAM)はsendtoではなくsendを使う
	sendedLen = send(sock, data, len, 0);
	if(sendedLen != len){
		printf("送信エラー 送信サイズ:%d\n", sendedLen);
		close(sock);
		return -3;
	}

	return 0;
}

/* スタティック関数 */