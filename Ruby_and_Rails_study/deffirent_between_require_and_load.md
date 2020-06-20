https://qiita.com/tatsurou313/items/30c85b2ac5945e63a31f

# require と load の違いについて

- require
  - 一回呼び出したら、global に定義される。そのため、同じファイルが二回呼び込まれることはない(global に定義された場所を見に行くため)。つまり一度読み込んだらファイルの更新はされない
- load
  - 毎回、ファイルの読み込まれる。そのため、ファイルの中身を読み込むたびに更新することができる

# rails における 自動読み込みで行われる require or load

rails では,require などしなくとも、コンソールなどで class を使用することができる。
これは、rails が良しなにそのファイルを require or load をしてくれるからである

仕組み
config.autoload_paths <= ここで定義されているファイルは自動で require or load される

- require と load は config.cache_classes が設定している
  - RAILS_ENV=development の場合(デフォルト設定)
    - config.cache_classes = false
      - ファイルをリクエストのたびに、load している
        - つまり、rails を再起動しなくてもファイルの変更が毎回反映されてくれる
  - RAILS_ENV= development 以外の場合
    - config.cache_class = true
      - ファイルを c require している
        - つまり、変更の反映は再起動が必要だが、動作は早い
