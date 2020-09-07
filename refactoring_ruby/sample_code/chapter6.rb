# 6-1 メソッドの抽出
def print_owing(previous_amount)
  # バナーを表示
  print_banner
  # 勘定を計算
  outstanding = calculate_outstanding(previous_amount * 1.2)
  # 詳細を表示
  print_details(outstanding)
end

def print_banner
  puts "***************"
  puts "***************"
  puts "***************"
end

def print_details(outstanding)
  puts "name: #{@name}"
  puts "amount: #{outstanding}"
end

 def calculate_outstanding(initial_value)
   @orders.inject { |result, order| result + order.amount }
 end

# 一時変数を減らす
# returnは一つ
# collectionクロージャメソッドで簡略化


# 6-2メソッドのインライン化 <= メソッドの抽出と逆のことをやる。メソッドの統一

def get_rating
  more_than_five_late_deliveries ? 2 : 1
end

def more_than_five_late_deliveries
  @number_of_late_deliveries > 5
end

#~~~~~~ refactoring ~~~~~~~~~
def get_rating
  @number_of_late_deliveries > 5 ? 2 : 1
end

# リファクタリングしすぎた結果、コードを見ればわかるレベルの時に不要に作成しないこと


# 6-3 一時変数のインライン化

base_price = an_order.base_price
return(base_price > 1000)

#~~~~~~~~~~~~~~~~~~~~~~

return (an_order.base_price > 1000)

# 一時変数から問い合わせメソッドへの派生。なるべく一時変数を使用しない。引数にメソッドがあっても全く問題ない

# 6-4 一時変数から問い合わせメソッドへ
#### 星三つ
def price
  base_price = @quantity * @item_price

  if(base_price > 1000)
    base_price * 0.95
  else
    base_price * 0.98
  end
end

#~~~~~~~~~~~~~~~~~~~~~
def price
  if(base_price > 1000)
    base_price * 0.95
  else
    base_price * 0.98
  end


end
#~~~~~~~~~~~~~~~
def price
  base_price * discount_factor
end

def base_price
  @quantitiy * @item_price
end

def discount_factor
   base_price > 1000 ? 0.95 : 0.98
end

# 割とやっていいのかかなり悩みがちだった部分。ローカル変数をメソッドに切り出す。結構使えそう
# 味噌は、base_priceがローカル変数でなくなったのでどこからでも呼び出せるようになったこと。引数がいらない

# 6-5 一時変数からチェインへ

class Select
  def options
    @options ||= []
  end

  def add_option(arg)
    @options << arg
  end
end

select = Select.new
select.add_option(1999)
select.add_option(2000)
select.add_option(2001)
select.add_option(2002)
select

# ~~~~~~~~~~~~~~~~~~
class Select
  def self.with_options(option)
    select = self.new
    select.options << option
    select
  end

  def options
    @options ||= []
  end

  def add_option(arg)
    @options << arg
  end
end

select = Select.with_options(1999)
select.add_option(1999)
select.add_option(2000)
select.add_option(2001)
select.add_option(2002)
select


#~~~~~~~~~~~~~~~~
class Select
  #....
  def add_option(arg)
    options << arg
    self
  end
end

select = Select.with_option(1999).add_option(2000).add_option(2001).add_option(2002)

#~~~~~~~~~~~~~~~
class Select
  def self.with_options(option)
    select = self.new
    select.options << option
    select
  end

  def options
    @options ||= []
  end

  def and(arg)
    @options << arg
  end
end

select = Select.with_option(1999).and(2000).and(2001).and(2002)
# チェインすること前提のメソッドの作成をしているのが違和感しかない。あんまり使用したいと思えない
# チェイン自体が悪いことではない,,,ということがわかったのはよかった

# 6-6 説明用変数の導入
### 星三つ

def price
  # 価格は、基本価格 - 数量割引 + 配送料
  return @quantity * @item_price -
    [0, @quantity - 500].max * @item_price * 0.05 +
    [@quantity * @item_price * 0.1, 100.0].min
end
#~~~~~~~~~~~~~~~~

def price
  base_price =  @quantity * @item_price
  return base_price -
    [0, @quantity - 500].max * @item_price * 0.05 +
    [@quantity * @item_price * 0.1, 100.0].min
end
#~~~~~~~~~~~~~~

def price
  base_price =  @quantity * @item_price
  quantitiy_discount = [0, @quantity - 500].max * @item_price * 0.05
  shipping = [@quantity * @item_price * 0.1, 100.0].min
  return base_price - quantitiy_discount + shipping
end

#~~~~~~~~~~~~~~~
# 応用 メソッドの抽出もやる

def price
  base_price - quantitiy_discount + shipping
end

def base_price
  @quantity * @item_price
end

def quantitiy_discount
  [0, @quantity - 500].max * @item_price * 0.05
end

def shipping
  [@quantity * @item_price * 0.1, 100.0].min
end


# 一時変数による可読性が上がるケースはあるということを認識できた。ここ、自信がなくて悩んで一時変数を入れることとかあったので、悩みがめちゃスッキリした。
# その一方で、極力一時変数を入れないことも理解


# 6-7 一時変数の分割
def deustance_traveled(time)
  acc = @primary_force / @mass
  primary_time = [time, @delay].min
  result =  0.5 * acc * primary_time * primary_time
  secondary_time = time  - @delay
  if secondary_time > 0
    primary_vel = acc * @delay
    acc = (@primary_force + @secondary_force) / @mass
    result += primary_vel * secondary_time + 5 * acc * secondary_time * secondary_time
  end
  result
end

#~~~~~~~~~~~~~~~~~~
def deustance_traveled(time)
  primary_acc = @primary_force / @mass
  primary_time = [time, @delay].min
  result =  0.5 * primary_acc * primary_time * primary_time
  secondary_time = time  - @delay
  if secondary_time > 0
    primary_vel = primary_acc * @delay
    secondary_acc = (@primary_force + @secondary_force) / @mass
    result += primary_vel * secondary_time + 5 * secondary_acc * secondary_time * secondary_time
  end
  result
end

# あんまり使用しなさそう...ではあるが、こういう時メソッドに抽出できないか考えることが多い。ある程度のDRYは許容すべきか？？


# 6-8 引数への代入の削除 <= NG: 参照渡し 意図的に値渡しにする
# 星3つ
def discount(input_val, quantitiy, year_to_date)
  input_val -= 2 if input_val > 50
  input_val -= 1 if input_val > 100
  input_val -= 4 if year_to_date > 10000
  input_val
end
#~~~~~~~~~~~~~~~~~~

def discount(input_val, quantitiy, year_to_date)
  result = input_val
  result -= 2 if input_val > 50
  result -= 1 if input_val > 100
  result -= 4 if year_to_date > 10000
  result
end

# Rubyは基本、値渡しである

# 6-9 メソッドからメソッドオブジェクトへ
# 星3つ

# ローカル変数が暴れすぎているときは、メソッドの抽出がうまくできない。
class Account
  def gamma(input_val, quantity, year_to_date)
    important_value1 = (input_val * quantitiy) + delta
    important_value2 = (input_val * quantitiy) + 100
    if (year_to_date - important_value1) > 100
      important_value2  -=20
    end
    important_value3 = important_value2 * 7
    # 等
    important_value3 - 2 * important_value1
  end
end

#~~~~~~~~~~~~~~ 一旦メソッドオブジェクトにしてしまう
class Gamma
  attr_reader :account,
              :input_val,
              :quantitiy,
              :year_to_date,
              :important_value1,
              :important_value2,
              :important_value3

  def initialize(account, input_val_arg, year_to_date)
    @account = account
    @input_val = input_val_arg
    @quantitiy = quantitiy
    @year_to_date = year_to_date
  end

  def compute
    @important_value1 = (input_val * quantitiy) + @account.delta
    @important_value2 = (input_val * year_to_date) + 100
    if (year_to_date - important_value1) > 100
      important_value2  -=20
    end
    important_value3 = important_value2 * 7
    # 等
    important_value3 - 2 * important_value1
  end


end

class Account
  def gamma(input_val, quantitiy, year_to_date)
    Gamma.new(self, input_val, quantitiy,year_to_date).compute
  end
end

# currencyなどのclassを拡張する時とかに使えそう。多国籍など、あとで発展する場合にはこのリファクタリング良さそう
