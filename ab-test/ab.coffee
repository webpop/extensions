storage = require("storage")


# <pop:ab:test name="test-name">
# lets you a/b test a series of variations
exports.test = (options, enclosed, scope) ->
  return error(enclosed, "<p>You must give your test a name.</p>") unless options.name

  # Get the pop:tags inside the test tag
  # Assign a key name to the test and
  # find out if we have a selection from the
  # query params or the session
  tags     = enclosed.tags (tag) -> tag.name
  key      = "ab_" + options.name
  selected = request.params.ab || request.session[key]

  if not selected
    # No selection - pick a random tag
    pick = tags[Math.floor(Math.random() * tags.length)]
    return error(enclosed, "<p>Add some options to choose from.</p>") unless pick?.render

    selected = pick.name
    request.session[key] = selected
    updateResults(key, selected)
  else
    # We already have a selection, find the right tag
    pick = null
    for tag in tags
      if selected == tag.name
        pick = tag
        break
    return error(enclosed, "<p>Something went wrong - no test version picked") if pick == null

  # Render the selected pop:tag
  scope[selected] = true
  enclosed.render(scope)


# <pop:ab:goal name="test-name">
# logs a win for an a/b test - place on a Goal page
exports.goal = (options, enclosed) ->
  return error(enclosed, "<p>You must give your test a name.</p>") unless options.name

  key      = "ab_" + options.name
  selected = request.params.ab || request.session[key]

  return if selected == null || request.session[key + "_win"]

  updateResults(key + "_wins", selected)
  request.session[key + "_win"] = true

# <pop:ab:results name="test-name">
# lets you output the results for a test
exports.results = (options, enclosed) ->
  ret = []

  log("Hello")
  log(JSON.stringify(storage.list({tag: "ab"})))

  for test in storage.list({tag: "ab"})
    log("Got test" + JSON.stringify(test));
    title     = test.key.replace(/^ab_/, '')
    results   = JSON.parse(test.value)
    wins      = JSON.parse(storage.get(test.key + "_wins") || "{}");
    test_data = [];

    for key, value of results
      test_data.push({name: key, option: key, picks: value || 0, wins: wins[test.key] || 0})

    ret.push
      title: title
      variations: test_data,
      result: resultFunction(test_data, options)

  ret

# <pop:ab:reset name="test-name">
# will reset the data for a test
exports.reset = (options) ->
  return unless options.name

  storage.put("ab_" + options.name, null)
  storage.put("ab_" + options.name + "_wins", null)

exports.routes =
  get:
    results: () ->
      if request.user
        response.render("ab/results", {title: "A/B Test Results"})
      else
        response.send("Redirecting", {Location: "/admin"}, 302)
  post:
    "goals/:name": (params) ->
      exports.goals(params)
      response.send("OK", {"Content-Type": "text/plain"})


# Helper functions

error = (enclosed, message) ->
  enclosed && enclosed.skip()
  message


updateResults = (key, selected) ->
  data = storage.get(key)
  results = if data then JSON.parse(data) else {}
  results[selected] = (results[selected] || 0) + 1
  storage.put(key, JSON.stringify(results), {tags: ["ab"]})


gTest = (data, yatesContinuity) ->
  variationTotals = []
  yesTotal        = 0
  noTotal         = 0
  total           = 0
  result          = 0

  for row, i in data
    variationTotals[i] = row.picks
    yesTotal          += row.yes
    noTotal           += row.no
    total             += row.picks

  for row in data
    expectations =
      yes: variationTotals[i] * yesTotal / total
      no:  variationTotals[i] * noTotal  / total

    for col in {yes:1, no:1}
      seen = row[col]
      expected = expectations[col]
      if yatesContinuity
        if expected + 0.5 < seen
           seen -= 0.5
        else if expected - 0.5 > seen
          seen += 0.5
        else
          seen = expected
      result += 2 * seen  * Math.log(seen/expected)

  result


resultFunction = (data, options) ->
  options = options || {}
  return ->
    statistics = require("libs/statistic-distribution")
    versions   = data.length
    winner     = data[0]
    minVal     = null

    return "Need at least 2 variations to calculate results" if versions < 2

    for row in data
      if winner.wins < row.wins then winner = row.wins
      if minVal == null || minVal > row.wins then minVal = row.wins

    return "All variations needs wins before you can get a test result" if minVal == 0

    g_all = gTest(data, options.yates != "false")
    p_all = statistics.chisqrprob(versions - 1, g_all)
    c_all = statistics.round_to_precision(100 * (1-p_all), 2)

    if warning = minVal < 10 then " (Warning: all variations should have at least 10 wins for reliable results)" else ""

    if versions == 2
      return winner.name + " wins with " + c_all + "% confidence" + warning
    else
      return "No automated calculation for 3+ variations yet."
