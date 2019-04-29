# Migrations Template

## *Creating Migrations:*

```ruby
rails generate migration MigrationName
```

| Column Types | Column Options |
| --- | --- |
| :boolean | :limit |
| :date | :default |
| :datetime | :null |
| :float | :precision |
| :integer | :scale |
| :string |
| :text |
| :time |

```ruby
class CreatePages < ActiveRecord::Migration[5.0]

  def change
    create_table :pages do |t|
      t.integer :subject_id, null: false
      t.string :name, limit: 50
      t.string :permalink
      t.integer :position
      t.boolean :visible, default: false
      t.timestamps
    end
    add_index :pages, :subject_id
    add_index :pages, :permalink
  end

end

```

## *Migration Methods:*

| Method Types |
| --- |
| add_column |
| remove_column |
| rename_column |
| rename_table |
| add_index |
| change_column |

```ruby
class AlterUsers < ActiveRecord::Migration[5.0]

  def change
    rename_table :users, :admin_users
    add_column :admin_users, :username, :string, limit: 25, after: "email"
    change_column :admin_users, :email, :string, limit: 100
    rename_column :admin_users, :password, :hashed_password

    puts "*** Adding an index ***"
    add_index :admin_users, :username
  end

end
```







# Model Template

```ruby
class Page < ApplicationRecord

  belongs_to :subject,
    primary_key: :id,
    foreign_key: :subject_id,
    class_name: :Subject

  has_many :sections
    primary_key: :id,
    foreign_key: :page_id,
    class_name: :Section

  scope :visible, lambda { where(visible: true) }
  scope :invisible, -> { where(visible: false) }
  scope :sorted, -> { order("position ASC") }
  scope :newest_first, lambda { order("created_at DESC") }

  validates_presence_of :name
  validates_length_of :name, :maximum => 255
  validates_presence_of :permalink
  validates_length_of :permalink, :within => 3..255
  # use presence_of with length_of to disallow spaces
  validates_uniqueness_of :permalink
  # for unique values by subject use ":scope => :subject_id"

end


```



# Routes

```ruby
Rails.application.routes.draw do

  root :to => 'public#index'

  get 'show/:permalink', :to => 'public#show', :as => 'public_show'

  get 'admin', :to => 'access#menu'
  get 'access/menu'
  get 'access/login'
  post 'access/attempt_login'
  get 'access/logout'

  resources :admin_users, :except => [:show] do
    member do
      get :delete
    end
  end

  resources :subjects do
    member do
      get :delete
    end
  end

  resources :pages do
    member do
      get :delete
    end
  end

  resources :sections do
    member do
      get :delete
    end
  end

  get 'demo/index'
  get 'demo/hello'
  get 'demo/other_hello'
  get 'demo/lynda'
  get 'demo/escape_output'

  # default route
  # may go away in future versions of Rails
  # get ':controller(/:action(/:id))'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```






# Controller

```ruby
class PagesController < ApplicationController

  layout 'admin'

  before_action :confirm_logged_in
  before_action :find_subject
  before_action :set_page_count, :only => [:new, :create, :edit, :update]


  def index
    @pages = @subject.pages.sorted
  end


  def show
    @page = Page.find(params[:id])
  end


  def new
    @page = Page.new(:subject_id => @subject.id)
  end


  def create
    @page = Page.new(page_params)
    @page.subject = @subject
    if @page.save
      flash[:notice] = "Page created successfully."
      redirect_to(pages_path(:subject_id => @subject.id))
    else
      render('new')
    end
  end


  def edit
    @page = Page.find(params[:id])
  end


  def update
    @page = Page.find(params[:id])
    if @page.update_attributes(page_params)
      flash[:notice] = "Page updated successfully."
      redirect_to(page_path(@page, :subject_id => @subject.id))
    else
      render('edit')
    end
  end


  def delete
    @page = Page.find(params[:id])
  end


  def destroy
    @page = Page.find(params[:id])
    @page.destroy
    flash[:notice] = "Page destroyed successfully."
    redirect_to(pages_path(:subject_id => @subject.id))
  end


  private


  def page_params
    params.require(:page).permit(:name, :position, :visible, :permalink)
  end


  def find_subject
    @subject = Subject.find(params[:subject_id])
  end


  def set_page_count
    @page_count = @subject.pages.count
    if params[:action] == 'new' || params[:action] == 'create'
      @page_count += 1
    end
  end

end


```
