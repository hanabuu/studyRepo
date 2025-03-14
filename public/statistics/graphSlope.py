# グラフの傾きと切片を求める
# [線形回帰を本当はPythonで解きたいけど表計算で解けと言われたので](https://qiita.com/maskot1977/items/97b3c3f0f3d35d5f162a)
# [線形重回帰を本当はPythonで解きたいけど表計算で解けと言われたので](https://qiita.com/maskot1977/items/f32e1c887d0f2e4ec8f7)

import math
import csv
import pandas as pd

# 平均値を求める関数
def mean(list):
    sum = 0
    for x in list:
        sum += x
    return sum / len(list)

# 分散を求める関数
def variance(list):
    ave = mean(list)
    sum = 0
    for x in list:
        sum += (x - ave) ** 2
    return sum / len(list)

# 標準偏差を求める関数
def standard_deviation(list):
    return math.sqrt(variance(list))

# 共分散 = 偏差積の平均
def covariance(list1, list2): 
    mean1 = mean(list1)
    mean2 = mean(list2)
    sum = 0
    for d1, d2 in zip(list1, list2):
        sum += (d1 - mean1) * (d2 - mean2)
    return sum / len(list1)


# 相関係数 = 共分散を list1, list2 の標準偏差で割ったもの
def correlation(list1, list2):
    return covariance(list1, list2) / (standard_deviation(list1) * standard_deviation(list2))

# 回帰直線の傾き＝相関係数＊（（yの標準偏差）／（xの標準偏差））
def w_fit(xlist, ylist):
    fit = 0.0
    try:
       fit = correlation(xlist, ylist) * standard_deviation(ylist) / standard_deviation(xlist) 
    except ZeroDivisionError:
        fit = 0.0
    return fit

# y切片＝yの平均－（傾き＊xの平均）
def t_fit(xlist, ylist):
    return mean(ylist) - w_fit(xlist, ylist) * mean(xlist)

df = pd.read_csv('./graphSlope.csv')

# print(df['x'].to_list())
# print(df['y'].to_list())

xlist = df['x'].to_list()
ylist = df['y'].to_list()

# 平均
print("x平均", mean(xlist), "y平均", mean(ylist))
# 分散
print("x分散", variance(xlist), "y分散", variance(ylist))
# 標準偏差
print("x標準偏差", standard_deviation(xlist), "y標準偏差", standard_deviation(ylist))
# 共分散
print("共分散", covariance(xlist,ylist))
# 相関係数
print("相関係数", correlation(xlist, ylist))
# 傾き,切片
print("傾き", w_fit(xlist, ylist), "切片", t_fit(xlist, ylist))

for index,row in df.iterrows():
    print(index, "行目")
    for col in row:
        print(col)