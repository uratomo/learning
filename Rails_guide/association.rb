# https://railsguides.jp/association_basics.html
# なぜやってるか?   => コードリーディングの指導の際に、buildやbuil_associationがbelongs_to由来で使用できるメソッドだと知ったから,,,
# 基本の確認を一回ちゃんとしたくてまとめてみる



# 普通のcreate
@book = Book.create(published_at: Time.now, author_id: @author.id)

# 削除時、authorを削除した時に、まとめて、bookを削除したい...
@books = Book.where(author_id: @author.id)
@books.each do |book|
  book.destroy
end
@author.destroy


# 上記をRails風にすると...
class Author < ApplicationRecord
  # ここで、削除時にbookも削除される設定になった
  has_many :books, dependent: :destroy
end

class Book < ApplicationRecord
  belongs_to :author
end

# associationの種類
  # belongs_to
  # has_one
  # has_many
  # has_many :through
  # has_one :through
  # has_and_belongs_to_many

# has_many :through について

  # Physician = 医師
  class Physician < ApplicationRecord
    has_many :appointments
    # 中間テーブルをappintmentsに指定している
    has_many :patients, through: :appointments
  end

  class Appointment < ApplicationRecord
    # 中間テーブル
    belongs_to :physician
    belongs_to :patient
    # 中間テーブルに好きにロジックをかけるのが、has_and_belongs_to_many と比較して良い点
  end

  class Patient < ApplicationRecord
    has_many :appointments
    # 中間テーブルをappintmentsに指定している
    has_many :physicians, through: :appointments
  end

# ポリモーフィック関連付け(一つの関連付けで複数の関連付けを表現できる)
  # 基本
  class Picture < ApplicationRecord
    belongs_to :imageable, polymorphic: true
  end

  class Employee < ApplicationRecord
    has_many :pictures, as: :imageable
  end

  class Product < ApplicationRecord
    has_many :pictures, as: :imageable
  end

  ## この最大のメリットは、一つのforeign_key で複数の値を見ることができる点である

  class CreatePictures < ActiveRecord::Migration[5.2]
    def change
      create_table :pictures do |t|
        t.string  :name
        # foreign_keyは一つでよい
        t.bigint  :imageable_id
        # どの、親クラスに所属しているか明示する
        t.string  :imageable_type
        t.timestamps
      end
      add_index :pictures, [:imageable_type, :imageable_id]
    end
  end

  # 自己関連付けをしたい時
  class Employee < ApplicationRecord
    #  部下とマネージャー関連付け
    has_many :subordinates, class_name: "Employee",
                            foreign_key: "manager_id"

    belongs_to :manager, class_name: "Employee", optional: true
  end

  ## スキーマは、自身にforeign_keyを持たせる
  class CreateEmployees < ActiveRecord::Migration[5.0]
    def change
      create_table :employees do |t|
        t.references :manager
        t.timestamps
      end
    end
  end


# has_many　で追加されるメソッド
  # collection
  # collection<<(object, ...)
  # collection.delete(object, ...)
  # collection.destroy(object, ...)
  # collection=(objects)
  # collection_singular_ids
  # collection_singular_ids=(ids)
  # collection.clear
  # collection.empty?
  # collection.size
  # collection.find(...)
  # collection.where(...)
  # collection.exists?(...)
  # collection.build(attributes = {}, ...)
  # collection.create(attributes = {})
  # collection.create!(attributes = {})
  # collection.reload

# belong_to　で追加されるメソッド
  # association
  # association=(associate)
  # build_association(attributes = {})
  # create_association(attributes = {})
  # create_association!(attributes = {})
  # reload_association


# ライフサイクルフック
  # before_add
  # after_add
  # before_remove
  # after_remove

# STIについて
  # - classの継承をすることで共通部分のメソッドを統一できる
  # - データベースを一つにすることができるため、保守性の向上
  # - データベース上での識別はtypeカラムで判断できる
  # - 個別にメソッドが変わってくる場合、メソッドのオーバーライドやyieldで、うまく処理を別にする
  # - null制約に課題はある。
