json.user do
    json.extract! @user, :id, :username,:firstname,:lastname,:email, :created_at
end