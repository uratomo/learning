
# 商品情報
class Movie
  # どういうタイプの製品を持っているか?
  REGULAR = 0
  NEW_RELEASE = 1
  CHILDRENS = 2

  attr_reader :title
  attr_accessor :price_code

  def initialize(title, price_code)
    @title, @price_code = title, price_code
  end
end

class Rental
  attr_reader :movie, :days_rented

  def initialize(movie, days_rented)
    @movie, @days_rented = movie, days_rented
  end

  def frequent_renter_points
    element.movie.price_code == Movie.NEW_RELEASE && element.days_rented > 1 ? 2 : 1
  end

  def charge(element)
    result = 0
    # 計算をする
    case element.movie.price_code
    when Movie::REGULAR
      result +=2
      result += (element.days_rented - 2) * 1.5 if element.days_rented > 2
    when Movie::NEW_RELEASE
      result += element.days_rented * 3
    when Movie::CHILDRENS
      result += 1.5
      # すでに足した分だけ削ってるだけ
      result += (element.days_rented - 3) * 1.5 if element.days_rented > 3
    end
    result
  end
end


class  Customer
  # 基本動作 カスタマーが、映画をレンタルする
  attr_reader :name

  def initialize(name)
    @name = name
    @rental = []
  end

  def add_rental(arg)
    @rental << arg
  end

  def statement
    total_amount, frequent_renter_points = 0, 0
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|
      frequent_renter_points += element.frequent_renter_points

      result += "\T" + element.movie.title + "\t" + element.charge.to_s + "\n"
      total_amount += element.charge
    end

    # 最終
    result += "Amount owed is #{total_amount}\n"
    result += "you earned #{frequent_renter_points} frequent points"
    result
  end
end
