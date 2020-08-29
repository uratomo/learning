
# 商品情報
class Movie
  # どういうタイプの製品を持っているか?
  REGULAR = 0
  NEW_RELEASE = 1
  CHILDRENS = 2

  attr_reader :title
  attr_accessor :price_code

  def price_code=(value)
    @price_code = value
    @price = case price_code
      when REGULAR; RegularPrice.new
      when NEW_RELEASE; NewReleasePrice.new
      when CHILDRENS; ChildrensPrice.new
    end
  end

  def initialize(title, the_price_code)
    @title, self.price_code = title, the_price_code
  end

  def charge(days_rented)
    @price.charge(days_rented)
  end
end

class RegularPrice
  def charge(days_rented)
    result =2
    result += (days_rented - 2) * 1.5 if days_rented > 2
    result
  end

class NewReleasePrice
  def charge(days_rented)
    days_rented * 3
  end
end

class ChildrensPrice
  def charge(days_rented)
    result = 1.5
    result += (days_rented - 3) * 1.5 if days_rented > 3
    result
  end
end

class Rental
  attr_reader :movie, :days_rented

  def initialize(movie, days_rented)
    @movie, @days_rented = movie, days_rented
  end

  def frequent_renter_points
    movie.price_code == Movie.NEW_RELEASE && days_rented > 1 ? 2 : 1
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

  def html_statement
    frequent_renter_points = 0
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|
      frequent_renter_points += element.frequent_renter_points

      result += "\t" + element.movie.title + "\t" + element.charge.to_s + "\n"
    end

    # 最終
    result += "Amount owed is #{total_charge}\n"
    result += "you earned #{frequent_renter_points} frequent points"
    result
  end

  private

  def total_charge
    @rentals.inject(0) { |sum, rental| sum + rental.charge }
  end
end
