require "minitest/autorun"
require "net/http"

class MyMiniTest
  class Unit < MiniTest::Unit
    def _run_suite(suite, type)
      begin
        suite.before_suite if suite.respond_to?(:before_suite)
        super(suite, type)
      ensure
        suite.after_suite if suite.respond_to?(:after_suite)
      end
    end
  end
end

MiniTest::Unit.runner = MyMiniTest::Unit.new

class DjsdTest < MiniTest::Unit::TestCase
  def self.before_suite
    Dir.chdir("test/fixtures")
    @pid = fork { exec '../../bin/djsd -p 3232' }
    wait_for_sever_to_start
  end

  def self.after_suite
    Process.kill("TERM", @pid)
  end

  def test_only_default_is_returned
    assert_equal(get("/unknown.com.js").body, "default\n")
  end

  def test_domain_returned
    assert_equal(get("/domain.com.js").body, "default\n\ndomain.com\n")
  end

  def test_sub_domain_returned
    assert_equal(get("/sub.domain.com.js").body, "default\n\ndomain.com\n\nsub.domain.com\n")
  end

  def self.wait_for_sever_to_start
    20.times do
      begin
        get("/")
        break
      rescue Errno::ECONNREFUSED
        sleep 0.1
      end
    end
  end

  def get(path)
    DjsdTest.get(path)
  end

  def self.get(path)
    Net::HTTP.get_response(URI.parse("http://localhost:3232#{path}"))
  end
end
