# *Table of Contents*
1. [Best Practices](#best-practices)
2. [Variable Scope Indicators](#var-scope)
3. [Object Types](#obj-types)
4. [Arrays](#arrays)
5. [Hashes](#hashes)
6. [Sets](#sets)
7. [Splat Operator](#splat)
8. [Inject Methods](#inject)
9. [Sort Methods](#sort)
10. [Merge Methods](#merge)
11. [Procs](#procs)
12. [Using &](#ampersand)
13. [Conditionals](#conditionals)
14. [Iterators](#iterators)
15. [Exit a Running Script](#exit)
16. [Inputs](#inputs)
17. [Outputs](#outputs)
18. [Find Methods](#find)
19. [Load, Require, and Include](#load)



# **Rails Getting Started**

```ruby
# Create rails project:
# =====================
rails new project_name -d mysql


# Login to mysql
# =====================
mysql -u root -p


# Create Databases
# =====================
CREATE DATABASE project_name_development;
CREATE DATABASE project_name_test;


# Connect to Database with a user and not root
# =====================
GRANT ALL PRIVILEGES ON project_name_development.* TO 'user_name'@'localhost' IDENTIFIED BY 'user_password'
GRANT ALL PRIVILEGES ON project_name_test.* TO 'user_name'@'localhost' IDENTIFIED BY 'user_password'


# Configure config/database.yml
# =====================
default: &default
  .
  .
  username: user_name
  password: user_password
end


# in terminal:
# checks to see if the configuration was successful
# =====================
rails db:schema:dump
```



- - -



# **2. Controllers**

```ruby
# Generate New Controller
# =======================
rails generate  # provides a list
rails g         # shorthand

rails generate controller 'NameOfController' 'desired_views'
rails generate controller demo index  # example

# ======================================================================

# Render Template Syntax
# =======================
render(:template => 'demo/hello')   # tells it which template to use.
render('demo/hello')                # shorthand because :template is implied
render('hello')                     # even shorter because we're inside the "demo" controller

# ======================================================================

# app/controllers
def DemoController < ApplicationController

  # Render Template:
  def index
    render('hello')
  end

  # Render Template:
  def hello
    @array = [1,2,3,4,5]    # instance variable
    @id = params['id']      # url parameter (strings and symbols work)
    @page = params[:page]   # url parameter
    render('index')
  end

  # Redirect Actions:
  def other_hello
    redirect_to(:controller => 'demo', :action => 'hello')
  end

  # Redirect Actions:
  def lynda
    redirect_to('www.lynda.com')
  end

end
```



- - -



# **3. Routes**
Type commands in `config/routes.rb`

* `Simple (Match) Route`
  + If you're only using Static Routes, then that means every page must have a static string associated with it.
  + *Not very flexible*
* `Default Route`
  + Controller must be specified. Action and ID are optional.
  + *Default Route may go away in future versions of Rails (because Resourceful Routing is more useful)*
* `Root Route`
  + Essentially the "homepage" of the website
* `Resourceful Routes`
  + Most professional Rails developers use them

```ruby
# Simple (Match) Route
# ====================
# Shorthand:
get "demo/index"
# Longer Version:
match "demo/index", :to => "demo#index", :via => :get


# Default Route
# ====================
# Shorthand:
get ':controller(/:action(/:id))'
# Longer Version:
match ':controller(/action(/:id))', :via => :get


# Root Route
# ====================
# Shorthand:
root "demo#index"
# Longer Version:
match "/", :to => "demo#index", :via => :get


# Resourceful Route
# ====================
resources :subjects
resources :pages
resources :sections
resources :admin_users, :except => [:show]
resources :products, :only => [:index, :show]
```



- - -



# **4. Databases**
* Index - Data structure on a table to increase lookup speed
* Foreign Key - Table column whose values reference rows in another table
* Schema - The structural definition of a database.
* CRUD - Create, Read, Update, Destroy

```ruby
# SQL Commands:
# ===================
SHOW DATABASES;
CREATE DATABASE db_name;
USE db_name;
DROP DATABASE db_name;


# Best to access a DB with a user and not the root account
# ===================
GRANT ALL PRIVILEGES ON db_name.*
  TO 'username'@'localhost'
  IDENTIFIED BY 'password';

SHOW GRANTS FOR 'username'@'localhost';


# Configure Project for a Database
# config/database.yml
# ==================
default: &default
  .
  .
  username: user_name
  password: password_here
end

# in terminal:
# checks to see if the configuration was successful
rails db:schema:dump    
```



- - -



# **5. Migrations**
* Adds tables to the database (written in Ruby)
* "Migrate" your database from one state to another
* Contains instructions for both:
  + Moving "up" to a new State
  + Moving back "down" to the previous state

```ruby
rails generate migration MigrationName
```


### *Generate Model*
* Automatically creates file in `db/migrate`
* Automatically creates file in app/models
* Automatically creates file in test directory

```ruby
rails generate model ModelName
rails g model Post title:string content:text category_id:integer
```


### *Run a Migration*
```ruby
rails db:migrate
rails db:migrate VERSION=0
rails db:migrate VERSION=20161231235959
rails db:migrate:status
rails db:up VERSION=20161231235959
rails db:down VERSION=20161231235959
rails db:redo VERSION=20161231235959
```


### *Table Column Types and Options*

```ruby
# Table Column Types
# ======================
binary, boolean, date, datetime, decimal, float, integer, string, text, time


# Table Column Options
# ======================
:limit => size
:default => value
:null => true/false
:precision => number
:scale => number


# Example:
class CreateUsers < ActiveRecord::Migration[5.0]

  def up
    create_table :users do |t|
      t.column "first_name", :string, :limit => 25      # long version
      t.string "last_name", :limit => 50                # shorthand
      t.string "email", :default => '', :null => false
      t.string "password", :limit => 40

      t.timestamps
      # t.datetime "created_at"
      # t.datetime "updated_at"
    end
  end

  def down
    drop_table :users
  end

end
```


### *Migration Methods*
```ruby
# Table Migration Methods
# =======================
create_table(table, options) do |t|
  ...columns...
end

drop_table(table)
rename_table(table, new_name)


# Column Migration Methods
# =======================
add_column(table, column, type, options)
remove_column(table, column)
rename_column(table, column, new_name)
change_column(table, column, type, options)


# Index Migration Methods
# =======================
add_index(table, column, options)
remove_index(table, column)


# Index Migration Method Options
# ==============================
:unique => true/false
:name => "your_custom_name"


# Example:
# ==============================
  class AlterUsers < ActiveRecord::Migration[5.0]

    def change
      rename_table("users", "admin_users")
      add_column("admin_users", "username", :string, :limit => 25, :after => "email")
      change_column("admin_users", "email", :string, :limit => 100)
      rename_column("admin_users", "password", "hashed_password")
      puts "*** Adding an index ***"
      add_intex("admin_users", "username")
    end

  end
```



- - -



# **6. Models and ActiveRecord**
```ruby
rails generate model ModelName
```

### *ActiveRecord and ActiveRelation*

*What is ActiveRecord?*
* `active record`: design pattern for relational databases
* `ActiveRecord`: Rails implementation of active record pattern
* Retrieve and manipulate data as **objects**, not as static rows

*ActiveRecord Objects: "Intelligent"*
* Understand the structure of the table
* Contain data from table rows
* Know how to create, read, update, and delete rows
* Can be manipulated as objects; then saved easily

```ruby
# Active Record Example:
user = User.new
user.first_name = "Kevin"
user.save     # SQL INSERT

user.last_name = "Skoglund"
user.save   # SQL UPDATE

user.delete   #SQL DELETE
```


*What is ActiveRelation?*
* Also known as "ARel"
* Object-oriented interpretation of relational algebra

*What is ActiveRelation?*
* Simplifies the generation of complex database queries
  * Small queries are chainable (like most Ruby objects).
  * Complex joins and aggregations use efficient SQL.
  * Queries do not execute until needed.


```ruby
users = User.where(:first_name => "Kevin")
users = users.order("last_name ASC").limit(5)

# SELECT users.* FROM users
# WHERE users.first_name = 'Kevin'
# ORDER BY users.last_name ASC
# LIMIT 5
```



### *Rails Console*
```
rails console development
rails console
rails c
```

### *Create, Update, Destroy Records*

* *Create Records*
  + `New/save`
    - Instantiate object
    - Set values
    - Save
  + `Create`
    - Instantiate object, set values, and save
* *Update Records*
  + `Find/save`
    - Find record
    - Set values
    - Save
  + `Find/update_attributes`
    - Find record
    - Set Values and save
* *Delete Records*
  + `Find/destroy`
    - Find record
    - Destroy
    - *(Gotcha moment: There is "Delete" but it does something different.)*


```ruby
rails console development

# New/Save (Separate commands)
# ========================
subject = Subject.new
subject.name = "Subject One"
subject.position = 2
subject.save

  # Create (New and Save in one command)
  # ========================
  subject = Subject.create(:name => "Subject Two", :position => 2)



# Update/Save (Separate commands)
# ========================
subject = Subject.find(1)
subject.name = "Initial Subject"
subject.save

  # Find/update_attributes (Find and Save in one command)
  # ========================
  subject = Subject.find(2)
  subject.update_attributes(:name => "Next Subject", :visible => true)



# Find/Destroy
# ========================
subject = Subject.find(3)
subject.destroy
```

### *Find Records*

| Name | Command | Return Value |
| --- |
| `Primary Key Finder` | Subject.find( *key* ) | Object or an error |
| `Dynamic Finders` | Subject.find_by_id( *key* ) | Object or nil |
|                   | Subject.find_by_name( "string" ) |          |
| `Find All`        | Subject.all | Array of Objects |
| `Find first/last` | Subject.first | Object or nil |
|                   | Subject.last |                |




### *Query Methods*

#### *Query Methods: Conditions*

* String
  + `"name"='Test' AND visible=true"`
  + Flexible, raw SQL
  + Use carefully and beware of SQL injection
* Array
  + `[ "name=? AND visible=true", "Test" ]`
  + Flexible, escaped SQL and safe from SQL injection
* Hash
  + `{ :name => "Test", :visible => true }`
  + Simple, escaped SQL, and safe from SQL injection
  + Each key-value pair joined with AND
  + Supports value ranges (50..51, [1,3,5,7])
  + No OR, LIKE, less than, or greater than

* Returns an ActiveRelation, which can be chained

```ruby
User.where(:last_name => 'Smith')
    .where(:first_name => 'John')
```

#### *Query Methods: Order, Limit, and Offset*
* order(string)
* limit(integer)
* offset(integer)
  - `Subject.order(:position).limit(20).offset(40)`

```ruby
# Order Argument
# ==============
order(:position)        # default is ascending order
order("position")
order(:position => :asc)
order("position ASC")
order(:position => :desc)
order("position DESC")
```



### *Order SQL Table Disambiguation*
* Not necessary for single table
* Recommended with joined tables
* Required when joined tables have same column names
  + `order("subjects.created_at ASC")`



- - -



# **7. Named Scopes**
* Write your own Query Method, which can use and combine built-in Query Methods
* Defined using ActiveRelation query methods
* Can be called like ActiveRelation methods
* Can accept parameters
* Rails 5 requires lambda syntax

```ruby
# scope syntax
# ===============
scope :active, lambda { where(:active => true) }
scope :active, -> { where(:active => true) }

# same as:
def self.active
  where(:active => true)
end

# To call it:
Customer.active



# scope can take arguments:
# ===============
scope :with_content_type, lambda {|ctype|
  where(:content_type => ctype)
}

# same as:
def self.with_content_type(ctype)
  where(:content_type => ctype)
end

# To call it:
Section.with_content_type('html')



# Example:
# ===============
class Subject < ApplicationRecord
    scope :visible, lambda { where(:visible => true) }
    scope :invisible, lambda { where(:visible => false) }
    scope :sorted, lambda { order("position ASC") }
    scope :newest_first, lambda { order("created_at DESC") }
    scope :search, lambda { |query| where(["name LIKE ?", "%#{query}%"]) }
end
```



- - -



# **8. Associations**

### *ActiveRecord Associations*
* One-to-one
  + Classroom `has_one` :teacher
  + Teacher `belongs_to` :classroom
* One-to-many
  + Teacher `has_many` :courses
  + Course `belongs_to` :teacher
    - Returns an `array` of objects instead of a single object
* Many-to-many (Simple)
  + Course `has_and_belongs_to_many` :students
  + Student `has_and_belongs_to_many` :courses
    - Requires a `Join Table` (Migration)
    - Name of table: first_table + _ + second_table **(Alphabetical Order)**
    - Two foreign keys; index both keys together
    - No primary key column (:id => false)
* Many-to-many (Rich)
  + Requires a `Join Table` (Model)
    - No table name conventions to follow
    - **Names ending in "-ments" or "-ships" work well**



```ruby
class Classroom < ApplicationRecord
  has_one :teacher
end

class Teacher < ApplicationRecord
  belongs_to :classroom
  has_many :courses
end

class Course < ApplicationRecord
  belongs_to :teacher
end
```

##### *Many-to-Many Join Table Naming*
  * first_table + _ + second_table
  * Plural table names
  * **Alphabetical order**
  * *Default name; can be configured*

```ruby
# Many-to-Many: Simple
# ==============================
rails genereate migration CreateCoursesStudentsJoin

# Join Table
# ==============================
class CreateCoursesStudentsJoin < ActiveRecord::Migration[5.0]

  def up
    create_table :courses_students, :id => false do |t|
      t.integer "course_id"
      t.integer "page_id"
    end
    add_index("courses_students", ["course_id", "page_id"])
  end

end


class Course < ApplicationRecord
  has_and_belongs_to_many :students
end

class Student < ApplicationRecord
  has_and_belongs_to_many :courses
end
```


```ruby
# Many-to-Many: Rich
# ==============================
genereate model CourseEnrollment

# Join Table
# ==============================
class CourseEnrollment < ActionRecord::Migration[5.0]

  def up
    create_table :course_enrollments do |t|
      t.integer "course_id"
      t.integer "student_id"
      t.string "summary"
      t.timestamps
    end
    add_index("course_enrollments", ['course_id', 'student_id'])
  end

end


class Course < ApplicationRecord
  has_many :course_enrollments
end

class Student < ApplicationRecord
  has_many :course_enrollments
end

class CourseEnrollment < ApplicationRecord
  belongs_to :courses
  belongs_to :students
end
```



### *Traverse a Rich Association*

```ruby
# AdminUser-Section
# has_many :through

AdminUser has_many :section_edits
AdminUser has_many :sections, :through => :section_edits

Section has_many :section_edits
Section has_many :admin_users, :through => :section_edits
```



- - -



# **9. CRUD, REST, and Resourceful Routes**

| CRUD | Action | HTTP Verb | URL | URL Helper |
| --- |
| Create | `new`    | GET   | /subjects/new | new_subject_path |
|        | create | POST  | /subjects | subjects_path |
| Read   | `index`  | GET   | /subjects | subjects_path |
|        | `show`   | GET   | /subjects/:id | subject_path(:id) |
| Update | `edit`   | GET   | /subjects/:id/edit | edit_subject_path(:id) |
|        | update | PATCH | /subjects/:id | subject_path(:id) |
| Delete | `delete` | GET   | /subjects/:id/delete | delete_subject_path(:id) |
|        | destroy | DELETE | /subjects/:id | subject_path(:id)

### *REST in Rails*
```html
<!-- REST is not universally supported so Rails has a workaround (method="PATCH/POST") -->

<form method ="PATCH" action="/subjects/123">
  # ...
</form>

<form method="POST" action="/subjects/123">
  <input type="hidden" name="_method" value="patch" />
</form>
```

### *Resourceful Routes*
* Rails default
* Optimized for REST
* Simple, consistent, organized structure
* Improves application security
* Most professional Rails developers use them

```ruby
# config/routes.rb

resources :subjects
resources :pages
resources :sections
resources :admin_users, :except => [:show]
resources :products, :only => [:index, :show]
```

### *Resourceful URL Helpers*
```html
{:controller => 'subjects', :action => 'show', :id => 5}
subject_path(5)   <!-- generates the same url as above -->


<%= link_to('All Subjects', subjects_path) %>
<%= link_to('All Subjects', subjects_path(:page => 3)) %>
<%= link_to('Show Subject', subjects_path(@subject.id)) %>
<%= link_to('Show Subject',
        subjects_path(@subject.id, :format => 'verbose')) %>
<%= link_to('Edit Subject', edit_subject_path(@subject.id)) %>
```



- - -




# **10. Assets**

### *Manifest Files*
* Contain directives for including asset files
* Loaded, processed, concatenated, compressed
* Serve one file, but develop with many files

### *Precompilation*
```ruby
export RAILS_ENV=production
bundle exec rails assets:precompile
```

### *Write Stylesheets*
* Location
  + With asset pipeline: /app/assets/stylesheets
  + Without asset pipeline: /public/stylesheets
* File name
  + Should end in ".css"
  + Sass files end in ".css.scss" (Requires `sass-rails gem`)

```html
<!-- HTML tag -->
<link href="/assets/stylesheets/application.css" rel="stylesheet" type="text/css" media="all" />

<!-- Rails Helper -->
<%= stylsheet_link_tag('application', :media => 'all') %>
<!-- Default to :media => 'screen' -->
```

### Write JavaScript Files
* Location
  + With asset pipeline: /app/assets/javascripts
  + Without asset pipeline: /public/javascripts
* File name
  + Should end in ".js"
  + CoffeeScript files end in ".coffee"
* JQuery
  + Included by default
  + jquery-rails gem
  + Include in manifest file

```html
<!-- HTML tag -->
<script src="/assets/javascripts/application.js" type="text/javascript"></script>

<!-- Rails Helper -->
<%= javascript_include_tag('application') %>
```



### *Sanitizing Javascript*
```html
escape_javascript_tag() or j()


<!-- example of Javascript Tag: -->
<% text = "User submitted text" %>
<%= javascript_tag("alert('You said: #{ text }');") %>

<!-- example of Sanitizing Javascript Tag: -->
<%= javascript_tag("alert('You said: #{ j(text) }');") %>
```



### *Images Tag*
* Location
  + With asset pipeline: /app/assets/images
  + Without asset pipeline: /public/images
  + User-uploaded images: /public/images
* Image upload gems
  + Paperclip and CarrierWave

```html
<!-- HTML tag -->
<image src="/assets/logo.png" />

<!-- Rails Helper -->
<%= image_tag('logo.png') %>

<%= image_tag('logo.png', :size => '90x55', :alt => 'logo') %>
<%= image_tag('logo.png', :width => 90, :height => 55) %>
```



- - -



# **11. Forms**

### *Rails/ERB vs HTML*

```html
<!-- Regular HTML Form -->
<form action="/subjects" method="post">
  <input type="text" name="name" />
  <input type="text" name="position" />
  <input type="text" name="visible" />

  <input type="submit" value="Create Subject" />
</form>


<!-- HTML Form: Array of Parameters -->
<form action="/subjects" method="post">
  <input type="text" name="subject[name]" />
  <input type="text" name="subject[position]" />
  <input type="text" name="subject[visible]" />

  <input type="submit" value="Create Subject" />
</form>


<!-- Rails: form_for :object -->
<%= form_for(#subject) do |f| %>
  <% f.text_field(:name) %>
  <% f.text_field(:position) %>
  <% f.text_field(:visible) %>

  <% f.submit("Create Subject") %>

<% end %>
```

### *Form Helpers*
* text_field
* password_field
* text_area
* hidden_field
* radio_button
* check_box
* file_field
* label

```html
<!-- tag style -->
<%= text_field_tag('name', params[:name]) %>

<!-- object aware style -->
<%= text_field(:subject, :name) %>

<!-- form builder style -->
<%= f.text_field(:name) %>
```

```ruby
form_for(@subject, :html => {:multipart => true}) do |f|
  f.label(:name)
  f.text_field(:name, :size => 40, :maxlength => 40)
  f.password_field(:password, :size => 40)
  f.hidden_field(:token, 'abcdef0123456789')

  f.text_area(:description, :size => "40x5") # :cols/rows

  f.radio_button(:content_type, "text")
  f.radio_button(:content_type, "HTML")

  f.check_box(:visible)

  f.file_field(:logo) # requires :multipart => true
end
```


### *Form Option Helpers*
```ruby
select(object, attribute, choices, options, html_options)

# Options:
#   :selected => object.attribute
#   :include_blank => false
#   :prompt => false
#   :disabled => false

form_for(@section) do |f|
  # Range
  f.select(:position, 1..5)

  # Array
  f.select(:content_type, ['text', 'HTML'])

  # Hash
  f.select(:visible, {"Visible" => 1, "Hidden" => 2})

  # Array of arrays
  f.select(:page_id, Page.all.map {|p| [p.name, p.id]})
end
```


### *Date and time form helpers*
```ruby
date_select(object, attribute, options, html_options)

# Options:
#   :start_year => Time.now.year-5
#   :end_year => Time.now.year+5
#   :order => [:year, :month, :day]
#   :discard_year => false
#   :discard_month => false
#   :discard_day => false
#   :include_blank => false
#   :prompt => false
#   :use_month_numbers => false
#   :add_month_numbers => false
#   :use_short_month => false
#   :date_separator => ""

time_select(object, attribute, options, html_options)

# Options:
#   :include_seconds => false
#   :minute_step => 1
#   :include_blank => false
#   :prompt => false
#   :time_separator => ":"

datetime_select(object, attribute, options, html_options)

# Options:
#   all date_select and time_select options:
#   :datetime_separator => "-"
```


### *Form Errors*
* Simple Validation
  + validates_presence_of :name
* objects.errors
  + Array containing any errors added by validations

### *Date and time form helpers*
```ruby
object.errors.clear
object.errors.size
object.errors.each {|attr, msg| ... }
  # :name, "can't be blank"
object.errors.full_messages.each {|msg| ... }
  # "Name can't be blank"
```


### *Displaying Errors*
* List errors above the form
* Print and highlight errors with each form input

```ruby
# Put output HTML in a partial
  app/views/application/_error_messages.html.erb
# Call with a custom helper
  error_messages_for(:object)
```


### *Prevent cross-site request forgery*

#### *What is Cross-Site Request Forgery (CSRF)?*
* Type of attack on a website
* Exploits user's currently logged-in state to perform actions which require authentication


#### Prevent CSRF
* Require user authentication
* Regularly log out inactive admin_users
* GET requests should be read-only
* Actions that expect POST requests should only respond to POST requests


#### Authenticity Token

#### CSRF Token for JavaScript and Ajax

```html
# Need to add
<%= csrf_meta_tag %>
```



- - -



# **12. Data Validation**

### *Validations*
* Ensure data meets requirements before saving to database
* Validation code resides in models
* ActiveRecord::Validations
* Failed validations: will not save, track errors


### *Validation Methods*
```
validates_presence_of
validates_length_of
validates_numericality_of
validates_inclusion_of
validates_exclusion_of
validates_format_of
validates_uniqueness_of
validates_acceptance_of
validates_confirmation_of
validates_associated
```


### Validates Method
```
validates :attribute, :presence => boolean,
                      :numericality => boolean,
                      :length => options_hash,
                      :format => {:with => regex},
                      :inclusion => {:in => array_or_range},
                      :exclusion => {:in => array_or_range},
                      :acceptance => boolean,
                      :uniqueness => boolean,
                      :confirmation => boolean

validates :email, :presence => true,
                  :length => { :maximum => 50 },
                  :uniqueness => true,
                  :format => { :with => EMAIL_REGEX },
                  :confirmation => true
```


### Custom Validates Method
```ruby
validate :custom_method

private

def custom_method
  if test_case
    errors.add(;attribute, "message")
  end
end


# ===
FORBIDDEN_USERNAMES = ['littlebopeep', 'humptydumpty', 'marymary']

validate :username_is_allowed

def username_is_allowed
  if FORBIDDEN_USERNAMES.include?(username)
    errors.add(:username, "has been restricted from use.")
  end
end
```
