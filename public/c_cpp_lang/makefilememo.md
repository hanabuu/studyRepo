# Makeファイルについて

## notdir

``` text
notdir は GNU Make の関数で、与えたパスのうち最後の “ファイル名（末尾要素）” だけを取り出します。
例：$(notdir /foo/bar/baz.cpp) → baz.cpp。この Makefile ではワイルドカードで集めたフルパスからファイル名だけを取り出して、共通の OBJ_DIR 配下にオブジェクトファイルを置きやすくしています。
```

``` text
PROD_DIR := ./testDir
SRCS := $(notdir $(wildcard $(PROD_DIR)/*.cpp))
```

- ```./testDir```内にあるcppファイルすべてを取得してファイル名だけを取り出している

## addprefix

``` text
addprefix も GNU Make の組み込み関数で、リスト内の各単語に指定した文字列を先頭に付け足します。
書式：$(addprefix prefix,list) → prefixword1 prefixword2 ...。
この Makefile では $(addprefix $(OBJ_DIR)/,$(MAIN_SRCS:.cpp=.o)) のように使って、main.cpp → build/main.o のようにビルド用ディレクトリのパスを各オブジェクト名へ付けています。
```

## patsubst

``` text
patsubst は “pattern substitute” の略で、GNU Make の文字列置換関数です。
書式：$(patsubst pattern,replacement,text) → text の各単語で pattern にマッチするものを replacement に置換します。% がワイルドカードとして使えます。
この Makefileでは $(patsubst ./%,%,$(...)) として、./foo/bar.cpp 形式で返ってくるパスから先頭の ./ を取り除いています。
```

## filter-out

``` text
filter-out は GNU Make のフィルタ関数で、指定したパターンにマッチする単語をリストから取り除きます。
書式：$(filter-out pattern,text)。pattern はスペース区切りで複数指定でき、% がワイルドカード。
```

``` text
SRCS := $(filter-out test1.cpp test2.cpp,$(SRCS))
```

- SRCSの中からtest1.cpp,test2.cppを取り除く