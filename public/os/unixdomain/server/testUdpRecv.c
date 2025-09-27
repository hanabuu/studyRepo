#include "testUdpRecvC.h"

int main(void) {
	int ret = 0;
	int input = 0;
	ret = startRecvThread();
	if(ret < 0){
		return -1;
	}
	sleep(100);	
	endRecvThread();
	return EXIT_SUCCESS;
}
