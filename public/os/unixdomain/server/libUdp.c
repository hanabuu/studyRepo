/*
 * libUdp.c
 *
 *  Created on: 2025/04/15
 *      Author: hanabusa
 */

#include "testUdpRecvC.h"

pthread_t recvDgramProcessThreadId;
int sock;
bool shutdownflg;

static void *recvDgramProcess(void *arg);
static int create_recv_socket(const char* sock_path, int *sock, struct sockaddr_un *recv_sun);
static int recv_socket(int sock);


/* グローバル関数 */

//==========================================================
/**
 * @brief		#～# UDP電文受信スレッド開始
 * @param		address [in] IPアドレス
 * @param		port [in] ポート番号
 * @return		処理結果
 * @retval		0	正常
 * @retval		-1	ソケットオープン失敗
 * @retval		-2	受信スレッド起動失敗
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
int startRecvThread(){

	int ret = 0;
	shutdownflg = false;

	ret = pthread_create(&recvDgramProcessThreadId, NULL, recvDgramProcess, NULL);
	if( ret != 0 ){
		printf("受信スレッド起動失敗\n");
		return -1;
	}
	return 0;
}

//==========================================================
/**
 * @brief		#～# UDP電文受信スレッド停止
 * @param		なし
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
void endRecvThread(){
	int ret = 0;

	shutdownflg = true;

	ret = pthread_join(recvDgramProcessThreadId, NULL);
	if(ret != 0){
		printf("受信スレッド停止失敗\n");
	}
}

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
int sendDgram(const char* sock_path, bool broadcast, const uint8_t* data, int len){
	int ret = 0;
	int opt = -1;
	int sendedLen = 0;
  	struct sockaddr_un sun;
  	memset(&sun, 0, sizeof(sun));

	socklen_t socklen = sizeof(sun);

	sun.sun_family = AF_LOCAL;               // UNIXドメイン
	strcpy(sun.sun_path, sock_path);  // UNIXドメインソケットのパスを指定

	ret = connect(sock, (const struct sockaddr *)&sun, sizeof(sun));
	if(ret < 0){
		printf("ソケット接続失敗 %d\n", ret);
		return -1;
	}

	sendedLen = sendto(sock, data, len, 0, (struct sockaddr *)&sun, sizeof(sun));
	if(sendedLen != len){
		printf("送信エラー 送信サイズ:%d\n", sendedLen);
		return -3;
	}

	return 0;
}


/* スタティック関数 */

//==========================================================
/**
 * @brief		#～# UDP電文受信ソケットオープン
 * @param		address [in] IPアドレス
 * @param		port [in] ポート番号
 * @return		処理結果
 * @retval		0	socket
 * @retval		-1	ソケットオープン失敗
 * @retval		-2	bind失敗
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
static int create_recv_socket(const char* sock_path, int *sock, struct sockaddr_un *recv_sun){
	int ret = 0;

	// ソケットアドレス構造体←今回はここがUNIXドメイン用のやつ
  	struct sockaddr_un sun; //, sun_client;
  	memset(&sun, 0, sizeof(sun));
  	// memset(&sun_client, 0, sizeof(sun_client));

	socklen_t socklen = sizeof(sun);

	remove(sock_path);  // socket作る前に前回のファイルを消しておく

	*sock = socket(AF_LOCAL, SOCK_STREAM, 0);
	if(*sock < 0){
		printf("ソケットオープン失敗\n");
		return -1;
	}
	  // ソケットアドレス構造体を設定
	sun.sun_family = AF_LOCAL;               // UNIXドメイン
	strcpy(sun.sun_path, sock_path);  // UNIXドメインソケットのパスを指定

	ret = bind(*sock, (const struct sockaddr *)&sun, sizeof(sun));
	if(ret < 0){
		printf("bind失敗 %d\n", ret);
		close(*sock);
		return -2;
	}

	ret = listen(*sock, 1);
    if(ret < 0){
        printf("listen失敗 %d\n", ret);
        close(*sock);
        return -3;
    }

	memcpy(recv_sun, &sun, sizeof(sun));

	return 0;
}

//==========================================================
/**
 * @brief		#～# UDP電文受信処理
 * @return		処理結果
 * @retval		0	正常
 * @retval		-1	受信待ち失敗
 * @retval		2	タイムアウト
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
static int recv_socket(int sock){

    int len = 0;
    int ret = 0;
    uint8_t buf[BUFFER_MAX];

	// タイムアウト設定（例：1秒）
    struct timeval timeout;
    timeout.tv_sec = 1;
    timeout.tv_usec = 0;

    fd_set fds;
    FD_ZERO(&fds);
    FD_SET(sock, &fds);

    ret = select(sock + 1, &fds, NULL, NULL, &timeout);
    if(ret == 0){
        // タイムアウト
        return 2;
    } else if(ret < 0){
        printf("select失敗 %d\n", ret);
        return -1;
    }

    // クライアントからの接続を受け付ける
    int client_sock = accept(sock, NULL, NULL);
    if(client_sock < 0){
        printf("accept失敗\n");
        return -1;
    }

    // データ受信
	// recvformは主にSOCK_DGRAMで使う。SOCK_STREAMではrecvを使う
	memset(buf, 0, sizeof(buf));
    len = recv(client_sock, buf, sizeof(buf), 0);
    if(len < 0){
        printf("受信失敗 %d\n", len);
    } else {
        printf("受信長:%d\n", len);
        // decode_bacnet_message(buf, len);
    }
    close(client_sock);
    return 0;
}

//==========================================================
/**
 * @brief		#～# UDP電文受信スレッド
 * @date		2025/04/16
 * @author		ALSOK 英
 */
//==========================================================
static void *recvDgramProcess(void *arg){

	int ret = 0;
	struct sockaddr_un recv_sun;

	(void)arg; // 引数は使用しないのでキャストして警告を回避
	memset(&recv_sun, 0, sizeof(recv_sun));

	ret = create_recv_socket(UNIX_SOCKET_PATH, &sock, &recv_sun);
	if(ret < 0){
		printf("ソケットオープン失敗\n");
		return 0;
	}

	for(;;){
		ret = recv_socket(sock);
		if(ret < 0 || shutdownflg){
			close(sock);
			break;
		}
	}
	return 0;
}

