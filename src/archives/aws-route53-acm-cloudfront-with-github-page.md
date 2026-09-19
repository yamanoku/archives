---
title: Route53でドメイン買ってACMでSSL証明書発行してCloudFrontでGithub Pagesと買ったドメインと紐付けた
tags: AWS route53 GitHub CertificateManager CloudFront
date: 2018-01-04
author: yamanoku
source: qiita.com
category: tech
topic: frontend
---

## 追記：2018/05/02

Github 側でカスタムドメインでも SSL 化対応してくれるようになったそうです。

CloudFront よくわからん、AWS ヤダみたいな人は無理しなくても良さそうです 😇

https://blog.github.com/2018-05-01-github-pages-custom-domains-https/

## なにこれ

タイトル通りの手順です。流れなので長いのはお許しください。

０からでもうまいことやれたので備忘録として書きました。参考までにどうぞ。

## 事前準備

- AWS へのアカウント登録関連は完了しておく
  - メール認証・クレカ登録などお忘れなく
- Github Pages 作成
  - 無料垢でも OK

## Route53 でドメインを買う

- Route53 にアクセス。
- 「Register Domain」ボタンよりドメイン購入手続き
  - [![Screenshot from Gyazo](https://gyazo.com/1909db49bec796d6b74ac77ecfed36e9/raw)](https://gyazo.com/1909db49bec796d6b74ac77ecfed36e9)
- 購入したいドメイン名を入力
- 欲しい TLD（.com, .net, .org など）を選択
- 「Check」ボタンより購入可能なドメインを検索
  - [![Screenshot from Gyazo](https://gyazo.com/cf376fabe3486d6eb63e1251df94e7e0/raw)](https://gyazo.com/cf376fabe3486d6eb63e1251df94e7e0)
- 「Add to cart」で欲しいドメインをカートに追加
- ページ下部の「Continue」ボタンで次へ
  - [![Screenshot from Gyazo](https://gyazo.com/b0a01a379736ad1532a5686602ea2419/raw)](https://gyazo.com/b0a01a379736ad1532a5686602ea2419)
- 購入者入力画面で各種入力
  - [![Screenshot from Gyazo](https://gyazo.com/d4d87e3de77816c712fc21b60107bc69/raw)](https://gyazo.com/d4d87e3de77816c712fc21b60107bc69)
- 「Privacy Protection」項目は特に考慮することがなければ **Hide contact information if the TLD registry, and the registrar, allow it** にチェック
  - [ドメインの連絡先情報のプライバシー保護の有効化/無効化箇所](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/domain-privacy-protection.html) になります。
- 入力後、問題なければ「Continue」ボタンで確認画面に遷移
- 「Terms and Conditions」の同意確認箇所にチェックを入れ、「Complete Purchase」ボタンで購入確定へ
  - [![Screenshot from Gyazo](https://gyazo.com/b0959d18ff3a0a9bc131e7c060dea8bb/raw)](https://gyazo.com/b0959d18ff3a0a9bc131e7c060dea8bb)
- メールにて購入完了の旨を受け取る。ドメイン購入はこれにて完了。
  - 下図は実際に買ったときのやつ
- AWS Certificate Manager に移動
  - [![Screenshot from Gyazo](https://gyazo.com/b12ce54876c9078d4f5a56f4bc8fd9a4/raw)](https://gyazo.com/b12ce54876c9078d4f5a56f4bc8fd9a4)

## AWS Certificate Manager

- 右上のリージョンが「バージニア北部」になっていることを確認
  - なっていなかったら選択
  - CloudFront で使用する際に必要
    - [![Screenshot from Gyazo](https://gyazo.com/e0cbe3bbc2412f31a873994c9c171384/raw)](https://gyazo.com/e0cbe3bbc2412f31a873994c9c171384)
- 「証明書のリクエスト」をクリック
  - [![Screenshot from Gyazo](https://gyazo.com/ea43c6b77f7daa425750617e7687e93f/raw)](https://gyazo.com/ea43c6b77f7daa425750617e7687e93f)
- ドメイン名の追加で先程購入したドメインを入力して「次へ」をクリック
  - [![Screenshot from Gyazo](https://gyazo.com/5a965cfe4fe959080d69fe97c73489c9/raw)](https://gyazo.com/5a965cfe4fe959080d69fe97c73489c9)
- 証明書のリクエスト検証は DNS にして「次へ」をクリック
  - [![Screenshot from Gyazo](https://gyazo.com/7492dbf9ddb80adf96005530188916ae/raw)](https://gyazo.com/7492dbf9ddb80adf96005530188916ae)
- 確認で問題なければ「確定とリクエスト」ボタンをクリック。
  - [![Screenshot from Gyazo](https://gyazo.com/00ff6b2169bf0ec63124959a96bbe5f3/raw)](https://gyazo.com/00ff6b2169bf0ec63124959a96bbe5f3)
- その後遷移する確定後の画面より「続行」ボタンをクリック。
- ダッシュボードに遷移して、検証保留中になっているのを確認したら CloudFront に移動
  - [![Screenshot from Gyazo](https://gyazo.com/d3b93a580edf975761e57c5206a6e640/raw)](https://gyazo.com/d3b93a580edf975761e57c5206a6e640)

## CloudFront

- 「Distributions」ダッシュボードが開いているのを確認して、「Create Distribution」をクリック
  - [![Screenshot from Gyazo](https://gyazo.com/0e310f558925fc82235158f32597e8bd/raw)](https://gyazo.com/0e310f558925fc82235158f32597e8bd)
- Web の方の「Get Started」をクリック
  - [![Screenshot from Gyazo](https://gyazo.com/a62fcd9dca6394d764f93b6d6ef552c5/raw)](https://gyazo.com/a62fcd9dca6394d764f93b6d6ef552c5)

### 01. Origin Settings

- 「Origin Domain Name」に自分の GitHub page を入力
  - ここでは GitHub page の URL ＝インデックスページという想定です
  - [![Screenshot from Gyazo](https://gyazo.com/a6f565bcc0cd5749338eb8db11087d73/raw)](https://gyazo.com/a6f565bcc0cd5749338eb8db11087d73)

### 02. Default Cache Behavior Settings

- 「Viewer Protocol Policy」を**Redirect HTTP to HTTPS**
- 「Cache Based on Selected Request Headers」を**Whitelist**
- 「Whitelist Headers」で**Hosts**を Add
  - [![Screenshot from Gyazo](https://gyazo.com/4e7f2fb903010864627793bd8b4b9760/raw)](https://gyazo.com/4e7f2fb903010864627793bd8b4b9760)

### 03. Distribution Settings

- 「Alternate Domain Names(CNAMEs)」に適応させるドメインを入力
- 「SSL Certificate」は**Custom SSL Certificate**を選択
  - このとき AWS Certificate Manager で作成した SSL 証明書が選択できると思うのでそれを選択
  - [![Screenshot from Gyazo](https://gyazo.com/45f194497695a27eff634d943475298b/raw)](https://gyazo.com/45f194497695a27eff634d943475298b)
- 01~03 までを入力したら「Create Distribution」ボタンをクリック
- その後生成された「Domain Name」（d から始まるやつ）の URL をコピー
  - [![Screenshot from Gyazo](https://gyazo.com/76a42865ccb51d7f3519bc6d07ca1477/raw)](https://gyazo.com/76a42865ccb51d7f3519bc6d07ca1477)
- コピーした URL が見れる状態になってるかを確認
- アクセスできるのを確認したら Route53 に戻る

## Route53

- 左メニューより「Hosted Zones」を選択、ダッシュボードに購入したドメイン名あるのでクリック
- 「Create Record Set」ボタンをクリック
  - [![Screenshot from Gyazo](https://gyazo.com/75aa0fa79e8c62940ad33d62308e2555/raw)](https://gyazo.com/75aa0fa79e8c62940ad33d62308e2555)
- Name は空で OK
- Type は A
- Alias は Yes をチェック
  - Alias Target に先程コピーした URL を貼る
- 「Save Record Set」クリックで追加
  - [![Screenshot from Gyazo](https://gyazo.com/30d54d9938cd894da5972f2d6b385edb/raw)](https://gyazo.com/30d54d9938cd894da5972f2d6b385edb)

## Github

- GitHub Pages のリポジトリに移動
- 「Settings」タブより設定ページに移動
  - [![Screenshot from Gyazo](https://gyazo.com/b795df7853711780c14fda9f17a406c2/raw)](https://gyazo.com/b795df7853711780c14fda9f17a406c2)

### GitHub Pages

- 「Custom domain」箇所に購入したドメインを入力、Save
  - DNS の浸透がまだだとはじかれるかもなので、10 分くらい待つのとか、CloudFront の Status が Deployed になっているかなど確認した上でやる
  - [![Screenshot from Gyazo](https://gyazo.com/cd4592176a225ad12c31d4dad40e106e/raw)](https://gyazo.com/cd4592176a225ad12c31d4dad40e106e)

## 反映を確認

🎉🎉🎉

[![Screenshot from Gyazo](https://gyazo.com/b1faf5eca06214f17314f3330e2ae58a/raw)](https://gyazo.com/b1faf5eca06214f17314f3330e2ae58a)

## 感想

- AWS、自分で１から触るのは始めてなので DNS 浸透なり証明書が無効だったりと色々ありしんどかった。
- ただここまでやっておけばある程度動かせる下地ができる感じなのでやっておいてよかった
- ドメイン買うのももっと安くやる方法もあるだろうけど、AWS サービス間で設定するなら全部まとめてやるのが分かりやすいかなと思ったのでこの手法で良かったと思う

## 参考

- [Github Pages でホスティングしつつ、CloudFront を使ってサイトを SSL 対応の独自ドメインにする](https://qiita.com/kechol/items/9609e1ab4a673e05b613)
- [CloudFront を利用して独自ドメインの GitHub Pages を HTTPS 化する](https://qiita.com/iogi/items/82618c1d56abba6b9337)
- [CloudFront からカスタムオリジンまでの通信を HTTPS 化する方法を 2 パターン](https://dev.classmethod.jp/cloud/aws/2way-to-use-https-from-cloudfront-to-custom-origin/)
- [Route53 と CloudFront で独自ドメインの GitHub Pages を HTTPS 化した](https://blog.pinekta.tech/aws/2017/02/21/sslchange/)
- [AWS Route53 ドメイン取得から Certificate Manager での証明書作成まで](https://qiita.com/sk565/items/2da1fc0c5fc676f54994)
