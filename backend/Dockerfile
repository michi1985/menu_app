FROM ruby:3.2

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gemfile
COPY Gemfile* ./

# Install gems
RUN bundle install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
