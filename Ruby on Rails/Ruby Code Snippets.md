# Ruby Code Snippets

# *Table of Contents*
1. [Quick Sort](#quick-sort)
2. [Merge Sort](#merge-sort)
3. [Bubble Sort](#bubble-sort)
4. [Binary Search](#binary-search)


- - -


# Quick Sort

```ruby
class Array
  def quicksort(&prc)
    prc ||= Proc.new { |a, b| a <=> b }

    return self if self.length < 2
    pivot = self.first
    rest = self.drop(1)

    left = rest.select { |el| prc.call(el, pivot) < 0 }
    right = rest.select { |el| prc.call(el, pivot) > -1 }
    left_sorted = left.quicksort(&prc)
    right_sorted = right.quicksort(&prc)

    left_sorted + [pivot] + right_sorted
  end
end

```


- - -


# Merge Sort

```ruby
class Array
  def merge_sort
    return self if count < 2

    middle = count / 2

    left, right = self.take(middle), self.drop(middle)
    sorted_left, sorted_right = left.merge_sort, right.merge_sort

    merge(sorted_left, sorted_right)
  end

  def merge(left, right)
    merged_array = []
    until left.empty? || right.empty?
      merged_array << (left.first < right.first) ? left.shift : right.shift
    end

    merged_array + left + right
  end
end
```

- - -


# Bubble Sort

```ruby

class Array

  def bubble_sort(&prc)
    prc ||= Proc.new {|a, b| a <=> b}
    sorted = false

    while !sorted
      sorted = true

      (0...self.length).each do |i|
        if proc.call(self[i], self[i+1]) == 1
          self[i], self[i+1] = self[i+1], self[i]
          sorted = false
        end
      end

    end
  end

end
```


- - -


# Binary Search

```ruby
def bsearch(nums, target)
  # nil if not found; can't find anything in an empty array
  return nil if nums.empty?

  probe_index = nums.length / 2
  case target <=> nums[probe_index]
  when -1
    # search in left
    bsearch(nums.take(probe_index), target)
  when 0
    probe_index # found it!
  when 1
    # search in the right; don't forget that the right subarray starts
    # at `probe_index + 1`, so we need to offset by that amount.
    sub_answer = bsearch(nums.drop(probe_index + 1), target)
    sub_answer.nil? ? nil : (probe_index + 1) + sub_answer
  end

  # Note that the array size is always decreasing through each
  # recursive call, so we'll either find the item, or eventually end
  # up with an empty array.
end
```
