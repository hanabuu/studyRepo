#include "testSockSender.h"

int main(void) {
	int ret = 0;
	int input = 0;
	// ret = startRecvThread();
	if(ret < 0){
		return -1;
	}
	puts("終了する場合は「9」を入力してください"); /* prints !!!Hello World!!! */
	for(;;){
		printf("コマンドを入力してください\n");
		scanf("%d", &input);
		printf("\n");

		if(input == 9){
			// endRecvThread();
			return 0;
		} else if(input == 1){
			sendDgram(UNIX_SOCKET_PATH, (const uint8_t *)"Hello Unix Domain Socket", 22);
		} else {
			printf("割り当ててない入力です\n");
		}

	}

	return EXIT_SUCCESS;
}
