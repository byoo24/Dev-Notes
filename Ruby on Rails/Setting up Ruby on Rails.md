# **Setting up a Ruby Development Environment**

# *Table of Contents*
1. [Xcode](#xcode)
2. [Homebrew](#homebrew)
3. [Git](#git)
4. [VS Code](#vscode)
5. [Rbenv + Ruby](#rbenv)
6. [Gems](#gems)
7. [Installying Pry](#pry)
8. [Using Byebug](#byebug)
9. [Install Rails](#rails)
10. [Install MySQL](#mysql)
11. [Web Servers](#web)


- - -


<a name="xcode"></a>
# Xcode

The Xcode command line tools are a requirement for installing the homebrew package manager in the next step.

Install the Xcode command line tools by running the following from the console.
```
xcode-select --install
```
To conclude the installation you will need to agree to the Xcode license. Start the Xcode app, click "Agree", and allow the installation to finish. Then you can go ahead and quit the Xcode app.

```
To check the version of Xcode:
gcc -v
```

- - -


<a name="homebrew"></a>
# Homebrew

https://brew.sh/

Enter the following in your terminal to download and install Homebrew:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
You will be given a list of dependencies that will be installed and prompted to continue or abort. Press `RETURN` to continue.

Let's break this command down a bit. `curl`, a command-line tool commonly used for downloading files from the internet, is used to download the Homebrew installation file. The `"$(...)"` transforms the file content into a string. Finally, the string is passed to our Ruby executable (`/usr/bin/`ruby is where this the system Ruby executable file is stored on our machine) with the `-e` flag to tell Ruby to run the argument as code.
```
brew doctor
brew update
```


- - -


<a name="git"></a>
# Git

Git is a version control system that allows us to track, commit and revert changes to files within a directory. Here we will install it and add global user info.
```
# install git
brew install git

# makes git terminal output pretty
git config --global color.ui true

# this will mark you as the 'author' of each committed change
git config --global user.name "your name here"

# use the email associated with your GitHub account
git config --global user.email your_email_here
```


- - -


<a name="vscode"></a>
# VS Code

Go to `code.visualstudio.com`, then download and install VS Code.

To verify that the shell commands were installed correctly, run `which code` in your terminal. If `code` is not a recognized command, open the VS Code editor, open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux) and type `shell command` to find the `Shell Command: Install 'code' command in PATH` command. Then restart the terminal. This allows you to easily open files in VS Code from the terminal using the `code` command followed by a file or directory.

Next, we'll want to install a few useful VS Code extensions and configure VS Code to play nice with these extensions. Download the zip file, which contains a scripts that will do the work for you. Unzip the file and open the `setup_vscode` directory. Then open that directory in the terminal (drag and drop it over the terminal icon on macOS or right click in the directory and select `Open in Terminal` on most Linux distributions). To run the script, type `./setup_vscode.sh`. The script will do the rest. Simply restart VS Code and you'll be good to go. (Note that there's a second script, called `setup_vscode_linter.sh`. We can't run this script yet but will do so in due time.)


- - -


<a name="rbenv"></a>
# Rbenv + Ruby

https://github.com/rbenv/rbenv

We like rbenv because it allows us to switch between versions of Ruby easily and setup default versions to use within project directories. This will install instances of Ruby in addition to the system version, which comes pre-installed.

First we will install rbenv, then use it to install our desired version of Ruby.

```
# install rbenv
brew install rbenv

# add to the PATH (rbenv commands are now available from terminal)
# .bashrc is the file that contains all of our terminal settings
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

# initialize rbenv everytime you open a new console window (otherwise our system ruby version will take over when we start a new terminal session)
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# update current console window with new settings
source ~/.bashrc

# source .bashrc from .bash_profile (necessary on some machines)
echo 'source ~/.bashrc' >> ~/.bash_profile

# install Ruby version 2.5.1
rbenv install 2.5.1

# set version 2.5.1 to be our global default
rbenv global 2.5.1

# the 'rehash' command updates the environment to your configuration
rbenv rehash

# and let's verify everything is correct
# check the version
ruby -v # => 2.5.1

# check that we are using rbenv (this tells you where the version of ruby you are using is installed)
which ruby # => /Users/your-username/.rbenv/shims/ruby
```


- - -


<a name="gems"></a>
# Gems

https://rubygems.org

There are a few gems we will want to access globally.

Bundler allows us to define project dependencies inside a `Gemfile` and gives us a bunch of commands to update, remove and install them. Check out the [Bundler docs](https://bundler.io/docs.html) for more info.

Pry is an alternative to the Irb (the default Ruby REPL). It is not only more powerful, but also easier to use than Irb and should be your go-to for running and debugging Ruby code. Check out the [Pry website](http://pryrepl.org/) for more info and a super useful tutorial.

Byebug is feature-rich debugging tool for Ruby. With Byebug you can halt the execution of your code and inspect/track variables and the flow of execution. Lots of cool features in here, so check out the [Byebug docs](https://github.com/deivid-rodriguez/byebug)!


- - -


<a name="pry"></a>
# Installing Pry

https://github.com/pry/pry/blob/master/README.md
```
gem install pry
# this will install the main pry gem

gem install pry-doc
# this will allow us to view ruby documentation in Pry, a nice bonus!
```

| Command |
| --- |
| `pry` |
| `ls` String |
| `show-doc` String#end_with? |
| `load` file |
| `show-source` is_prime? |


- - -


<a name="byebug"></a>
# Using Byebug

In Ruby versions 2.0 and greater, we can use Byebug as a debugging tool.
```
gem install byebug
```

Before running your file:
* `require "byebug"` - add to the top of your file to gain access to the gem
* `debuger` - place this line at a point in your file where you want to begin debugger mode

While you're in debugger mode:

| Command |
| --- |
| `l <startline><endline>` |
| `step` or `s` |
| `next` or `n` |
| `break <line num>` or `b <line num>` |
| `continue` or `c` |
| `display <variable>` |


- - -


<a name="rails"></a>
# Install Rails

```
gem install rails
```


- - -


<a name="mysql"></a>
# Install MySQL
```
  brew install mysql


# We've installed your MySQL database without a root password. To secure it run:
  mysql_secure_installation


# To connect run:
  mysql -uroot


# To have launchd start mysql now and restart at login:
  brew services start mysql
# Or, if you don't want/need a background service you can just run:
  mysql.server start


# Allow Rails to talk to MySQL
  gem install mysql2
# note: the 2 at the end
```


- - -


<a name="web"></a>
# Web Servers

* Apache 2
* NGINX ("Engine X")
* Passenger
* Unicorn

--> Rails 5 uses `Puma` as the Web Server
