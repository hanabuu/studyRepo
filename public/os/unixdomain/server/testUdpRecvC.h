#ifndef TEST_UDP_RECV_C_H
#define TEST_UDP_RECV_C_H

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdint.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/time.h>
#include <string.h>

#define BUFFER_MAX 1502                          //受信バッファサイズ
#define UNIX_SOCKET_PATH "/tmp/test.unixsocket"

#define TIMEOUT (1000)                          //受信タイムアウト

extern int startRecvThread();
extern void endRecvThread();
extern int sendDgram(const char* sock_path, bool broadcast, const uint8_t* data, int len);

#endif // TEST_UDP_RECV_C_H