# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  firstname       :string
#  lastname        :string
#  email           :string
#
class User < ApplicationRecord
    has_many :carted_items
    has_many :comments ,dependent: :destroy
    has_many :games, through: :carted_items
    has_secure_password
    validates :username, presence: { message: ' cannot be blank' }, uniqueness: { message: ' is already taken' }, length: { minimum: 6, message: ' should be at least 6 characters' }
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :email, presence: { message: ' cannot be blank' }, uniqueness: { message: ' is already taken' }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, uniqueness: true
    validates :password_digest, presence: true
    validates :password,  length: { minimum: 8, maximum: 16, message: ' should be at least 8 characters and at most 16 characters' }, allow_nil: true
    attr_reader :password

    before_validation :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        password_object = BCrypt::Password.new(self.password_digest)
        password_object.is_password?(password)
    end

    def generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
        self.session_token
    end

end
