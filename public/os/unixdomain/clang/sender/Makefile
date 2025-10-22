CC = gcc
CFLAGS = -Wall -Wextra -g
LDFLAGS = -pthread 

# Source directories
SRCDIR = .
 
TARGET = unixdomainSender
# Main source files
MAIN_SRCS = libSockSender.c testSockSender.c

SRCS = $(MAIN_SRCS)

OBJS = libSockSender.o
OBJS += testSockSender.o

 # Build rules
all: $(TARGET)

$(TARGET): $(OBJS)
	@echo "Linking $(TARGET)..."
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS) $(LDFLAGS)
	$(RM) -f $(OBJS)
	@echo "Build complete!"

%.o: %.c
	@echo "Compiling $<..."
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	@echo "Cleaning..."
	$(RM) -f $(TARGET) $(OBJS)
	@echo "Clean complete!"

distclean: clean
	$(RM) -f *~ core

# Show source files (for debugging)
show-sources:
	@echo "Source files:"
	@echo $(SRCS) | tr ' ' '\n'

# Show object files (for debugging)
show-objects:
	@echo "Object files:"
	@echo $(OBJS) | tr ' ' '\n'

# Dependencies (optional, for more advanced builds)
depend:
	$(CC) $(CFLAGS) -MM $(SRCS) > .depend

-include .depend

.PHONY: all clean distclean show-sources show-objects depend
# all: $(TARGET)
 
# $(TARGET): $(OBJS)
# 	$(CXX) $(CFLAGS) -o $(TARGET) $(OBJS) $(LDFLAGS)
# 	$(RM) -f $(OBJS)
 
# # cファイルのコンパイル
# %.o: %.c
# 	$(CXX) $(CFLAGS) -c $< -o $@

# clean:
# 	rm -f $(TARGET) $(OBJS)
 
# .PHONY: all clean 
