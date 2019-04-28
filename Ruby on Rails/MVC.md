# Model



# Controller

```ruby
class CatsController < ApplicationController

  def index
    # GET /cats
    self.render json: Cat.all
  end

  def show
    # GET /cats/123
    self.render json: Cat.find(self.params[:id])
  end

  def create
    # POST /cats
    # Content-Length: ...
    #
    # { "cat" : {"name": "Sally"} }

    cat = cat = Cat.new(name: params[:cat][:name])

    if cat.save
      render json: cat
    else
      render json: cat.errors.full_messages, status: :unprocessable_entity
    end
  end


  def update
  end

  def destroy
  end
end
```
