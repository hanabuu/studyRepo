# 時系列データの予測

## まとめ

[Python で時系列予測に使える機械学習モデルの実行例まとめ](https://qiita.com/satshout/items/1f9c2add8a717d7d8d0b)
[Prophetの使い方メモ](https://qiita.com/tchih11/items/42fc0d52a1486ba64b5d)

### TensorFlow

- Google の学習フレームワーク

[Windows 版 Anaconda で TensorFlow 環境構築](https://qiita.com/exy81/items/48314b968d9fad6170c8)

- エラー出たけど、実行はできた。
<details>
　<summary>実行結果</summary>
    <p>
    > pip install tensorflow
    Collecting tensorflow
    Downloading tensorflow-2.13.1-cp38-cp38-win_amd64.whl.metadata (2.6 kB)
    INFO: pip is looking at multiple versions of tensorflow to determine which version is compatible with other requirements. This could take a while.
    Downloading tensorflow-2.13.0-cp38-cp38-win_amd64.whl.metadata (2.6 kB)
    Collecting tensorflow-intel==2.13.0 (from tensorflow)
    Downloading tensorflow_intel-2.13.0-cp38-cp38-win_amd64.whl.metadata (4.1 kB)
    Collecting absl-py>=1.0.0 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading absl_py-2.1.0-py3-none-any.whl.metadata (2.3 kB)
    Collecting astunparse>=1.6.0 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading astunparse-1.6.3-py2.py3-none-any.whl.metadata (4.4 kB)
    Collecting flatbuffers>=23.1.21 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading flatbuffers-24.3.25-py2.py3-none-any.whl.metadata (850 bytes)
    Collecting gast<=0.4.0,>=0.2.1 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading gast-0.4.0-py3-none-any.whl.metadata (1.1 kB)
    Collecting google-pasta>=0.1.1 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading google_pasta-0.2.0-py3-none-any.whl.metadata (814 bytes)
    Requirement already satisfied: h5py>=2.9.0 in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (3.11.0)
    Collecting libclang>=13.0.0 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading libclang-18.1.1-py2.py3-none-win_amd64.whl.metadata (5.3 kB)
    Requirement already satisfied: numpy<=1.24.3,>=1.22 in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (1.24.3)
    Collecting opt-einsum>=2.3.2 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading opt_einsum-3.4.0-py3-none-any.whl.metadata (6.3 kB)
    Requirement already satisfied: packaging in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (24.1)
    Requirement already satisfied: protobuf!=4.21.0,!=4.21.1,!=4.21.2,!=4.21.3,!=4.21.4,!=4.21.5,<5.0.0dev,>=3.20.3 in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (3.20.3)
    Requirement already satisfied: setuptools in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (72.1.0)
    Requirement already satisfied: six>=1.12.0 in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (1.16.0)
    Collecting termcolor>=1.1.0 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading termcolor-2.4.0-py3-none-any.whl.metadata (6.1 kB)
    Collecting typing-extensions<4.6.0,>=3.6.6 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading typing_extensions-4.5.0-py3-none-any.whl.metadata (8.5 kB)
    Requirement already satisfied: wrapt>=1.11.0 in c:\users\user\anaconda3\lib\site-packages (from tensorflow-intel==2.13.0->tensorflow) (1.14.1)
    Collecting grpcio<2.0,>=1.24.3 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading grpcio-1.67.0-cp38-cp38-win_amd64.whl.metadata (4.0 kB)
    Collecting tensorboard<2.14,>=2.13 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading tensorboard-2.13.0-py3-none-any.whl.metadata (1.8 kB)
    Collecting tensorflow-estimator<2.14,>=2.13.0 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading tensorflow_estimator-2.13.0-py2.py3-none-any.whl.metadata (1.3 kB)
    Collecting keras<2.14,>=2.13.1 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading keras-2.13.1-py3-none-any.whl.metadata (2.4 kB)
    Collecting tensorflow-io-gcs-filesystem>=0.23.1 (from tensorflow-intel==2.13.0->tensorflow)
    Downloading tensorflow_io_gcs_filesystem-0.31.0-cp38-cp38-win_amd64.whl.metadata (14 kB)
    Requirement already satisfied: wheel<1.0,>=0.23.0 in c:\users\user\anaconda3\lib\site-packages (from astunparse>=1.6.0->tensorflow-intel==2.13.0->tensorflow) (0.43.0)
    Collecting google-auth<3,>=1.6.3 (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading google_auth-2.35.0-py2.py3-none-any.whl.metadata (4.7 kB)
    Collecting google-auth-oauthlib<1.1,>=0.5 (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading google_auth_oauthlib-1.0.0-py2.py3-none-any.whl.metadata (2.7 kB)
    Requirement already satisfied: markdown>=2.6.8 in c:\users\user\anaconda3\lib\site-packages (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (3.4.1)
    Requirement already satisfied: requests<3,>=2.21.0 in c:\users\user\anaconda3\lib\site-packages (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (2.32.3)
    Collecting tensorboard-data-server<0.8.0,>=0.7.0 (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading tensorboard_data_server-0.7.2-py3-none-any.whl.metadata (1.1 kB)
    Requirement already satisfied: werkzeug>=1.0.1 in c:\users\user\anaconda3\lib\site-packages (from tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (3.0.3)
    Requirement already satisfied: cachetools<6.0,>=2.0.0 in c:\users\user\anaconda3\lib\site-packages (from google-auth<3,>=1.6.3->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (4.2.2)
    Requirement already satisfied: pyasn1-modules>=0.2.1 in c:\users\user\anaconda3\lib\site-packages (from google-auth<3,>=1.6.3->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (0.2.8)
    Collecting rsa<5,>=3.1.4 (from google-auth<3,>=1.6.3->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading rsa-4.9-py3-none-any.whl.metadata (4.2 kB)
    Collecting requests-oauthlib>=0.7.0 (from google-auth-oauthlib<1.1,>=0.5->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading requests_oauthlib-2.0.0-py2.py3-none-any.whl.metadata (11 kB)
    Requirement already satisfied: importlib-metadata>=4.4 in c:\users\user\anaconda3\lib\site-packages (from markdown>=2.6.8->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (7.0.1)
    Requirement already satisfied: charset-normalizer<4,>=2 in c:\users\user\anaconda3\lib\site-packages (from requests<3,>=2.21.0->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (2.0.4)
    Requirement already satisfied: idna<4,>=2.5 in c:\users\user\anaconda3\lib\site-packages (from requests<3,>=2.21.0->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (3.7)
    Requirement already satisfied: urllib3<3,>=1.21.1 in c:\users\user\anaconda3\lib\site-packages (from requests<3,>=2.21.0->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (1.26.19)
    Requirement already satisfied: certifi>=2017.4.17 in c:\users\user\anaconda3\lib\site-packages (from requests<3,>=2.21.0->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (2024.8.30)
    Requirement already satisfied: MarkupSafe>=2.1.1 in c:\users\user\anaconda3\lib\site-packages (from werkzeug>=1.0.1->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (2.1.3)
    Requirement already satisfied: zipp>=0.5 in c:\users\user\anaconda3\lib\site-packages (from importlib-metadata>=4.4->markdown>=2.6.8->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (3.17.0)
    Requirement already satisfied: pyasn1<0.5.0,>=0.4.6 in c:\users\user\anaconda3\lib\site-packages (from pyasn1-modules>=0.2.1->google-auth<3,>=1.6.3->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow) (0.4.8)
    Collecting oauthlib>=3.0.0 (from requests-oauthlib>=0.7.0->google-auth-oauthlib<1.1,>=0.5->tensorboard<2.14,>=2.13->tensorflow-intel==2.13.0->tensorflow)
    Downloading oauthlib-3.2.2-py3-none-any.whl.metadata (7.5 kB)
    Downloading tensorflow-2.13.0-cp38-cp38-win_amd64.whl (1.9 kB)
    Downloading tensorflow_intel-2.13.0-cp38-cp38-win_amd64.whl (276.5 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 276.5/276.5 MB 21.5 MB/s eta 0:00:00
    Downloading absl_py-2.1.0-py3-none-any.whl (133 kB)
    Downloading astunparse-1.6.3-py2.py3-none-any.whl (12 kB)
    Downloading flatbuffers-24.3.25-py2.py3-none-any.whl (26 kB)
    Downloading gast-0.4.0-py3-none-any.whl (9.8 kB)
    Downloading google_pasta-0.2.0-py3-none-any.whl (57 kB)
    Downloading grpcio-1.67.0-cp38-cp38-win_amd64.whl (4.4 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.4/4.4 MB 17.5 MB/s eta 0:00:00
    Downloading keras-2.13.1-py3-none-any.whl (1.7 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.7/1.7 MB 18.5 MB/s eta 0:00:00
    Downloading libclang-18.1.1-py2.py3-none-win_amd64.whl (26.4 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 26.4/26.4 MB 22.9 MB/s eta 0:00:00
    Downloading opt_einsum-3.4.0-py3-none-any.whl (71 kB)
    Downloading tensorboard-2.13.0-py3-none-any.whl (5.6 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5.6/5.6 MB 20.0 MB/s eta 0:00:00
    Downloading tensorflow_estimator-2.13.0-py2.py3-none-any.whl (440 kB)
    Downloading tensorflow_io_gcs_filesystem-0.31.0-cp38-cp38-win_amd64.whl (1.5 MB)
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.5/1.5 MB 15.5 MB/s eta 0:00:00
    Downloading termcolor-2.4.0-py3-none-any.whl (7.7 kB)
    Downloading typing_extensions-4.5.0-py3-none-any.whl (27 kB)
    Downloading google_auth-2.35.0-py2.py3-none-any.whl (208 kB)
    Downloading google_auth_oauthlib-1.0.0-py2.py3-none-any.whl (18 kB)
    Downloading tensorboard_data_server-0.7.2-py3-none-any.whl (2.4 kB)
    Downloading requests_oauthlib-2.0.0-py2.py3-none-any.whl (24 kB)
    Downloading rsa-4.9-py3-none-any.whl (34 kB)
    Downloading oauthlib-3.2.2-py3-none-any.whl (151 kB)
    Installing collected packages: libclang, flatbuffers, typing-extensions, termcolor, tensorflow-io-gcs-filesystem, tensorflow-estimator, tensorboard-data-server, rsa, opt-einsum, oauthlib, keras, grpcio, google-pasta, gast, astunparse, absl-py, requests-oauthlib, google-auth, google-auth-oauthlib, tensorboard, tensorflow-intel, tensorflow
    Attempting uninstall: typing-extensions
        Found existing installation: typing_extensions 4.11.0
        Uninstalling typing_extensions-4.11.0:
        Successfully uninstalled typing_extensions-4.11.0
    ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following depsqlalchemy 2.0.30 requires typing-extensions>=4.6.0, but you have typing-extensions 4.5.0 which is incompatible.
    pydantic 2.5.3 requires typing-extensions>=4.6.1, but you have typing-extensions 4.5.0 which is incompatible.
    pydantic-core 2.14.6 requires typing-extensions!=4.7.0,>=4.6.0, but you have typing-extensions 4.5.0 which is incompatible.
    spyder 5.2.2 requires pyqt5<5.13, but you have pyqt5 5.15.10 which is incompatible.
    spyder 5.2.2 requires pyqtwebengine<5.13, but you have pyqtwebengine 5.15.6 which is incompatible.
    Successfully installed absl-py-2.1.0 astunparse-1.6.3 flatbuffers-24.3.25 gast-0.4.0 google-auth-2.35.0 google-auth-oauthlib-1.0.0 google-pasta-0.2.0 grpcio-1.67.0 keras-2.13.1 libclang-18.1.1 oauthlib-3.2.2 opt-einsum-3.4.0 requests-oauthlib-2.0.0 rsa-4.9 tensorboard-2.13.0 tensorboard-data-server-0.7.2 tensorflow-2.13.0 tensorflow-estimator-2.13.0 tensorflow-intel-2.13.0 tensorflow-io-gcs-filesystem-0.31.0 termcolor-2.4.0 typing-extensions-4.5.0
    (base) PS C:\temp\PythonWork\testProphet> python -c "import tensorflow as tf; print(tf.__version__)"
    2.13.0
    (base) PS C:\temp\PythonWork\testProphet> python .\test.py
    (base) PS C:\temp\PythonWork\testProphet> 
    </p>
</details>
