class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:omniauthable, omniauth_providers: [:facebook,:twitter]
  validates :nickname, presence: true
  

  has_one_attached :image

  has_many :sns_credentials
  has_one :point
  has_one :debt
  def self.from_omniauth(auth)
    # binding.pry
    sns = SnsCredential.where(provider: auth.provider, uid: auth.uid,email: auth.info.email).first_or_create do |sns_credentials|
      sns_credentials.image = auth.info.image
    end
    # sns認証したことがあればアソシエーションで取得
    # 無ければemailでユーザー検索して取得orビルド(保存はしない)
    
      
    
    user = sns.user || User.where(email: auth.info.email).first_or_initialize(
      nickname: auth.info.name,
         email: auth.info.email
    )
    

    # userが登録済みの場合はそのままログインの処理へ行くので、ここでsnsのuser_idを更新しておく
    # if user.persisted?
    #   sns.user = user
    #   sns.save
    # end
    user
  end
end
