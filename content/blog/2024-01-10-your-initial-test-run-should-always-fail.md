+++
title = "Your initial test run should always fail"
description = "When you write tests for your code, your initial run should always fail."
[taxonomies]
tags = ["Thoughts", "Testing", "Development"]
+++

If you write tests for your code and you use unit-tests, your first initial run
of the test should _always_ fail. If you don't do that you won't know if your
code actually passes the test.

Let me give you an example:

You write a simple addition function like this:

```typescript
function add(a: number, b: number) {
  const sum = a + b
  return 4
}
```

And then you write your test:

```typescript
Deno.test("Verify sum of `add()` equals 4", async () => {
  const sum = add(2, 2)

  assertEquals(sum, 4)
})
```

If we run this test, it will pass on the first try. But do you see what is
wrong? Yes, I know this is simple example, but that is also the point. Even when
we write tests for simple stuff, we often forget that the stuff that we test
might be poorly written or that there are typos etc.

If we instead wrote the test so that it would fail:

```diff
Deno.test("Verify sum of `add()` equals 4", async () => {
-  const sum = add(2, 2)
+  const sum = add(4, 4)

  assertEquals(sum, 4)
})
```

We would notice that there was something odd with our function, because 4+4 is
not 4, although our test says so.
