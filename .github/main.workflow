workflow "Build" {
  on = "push"
  resolves = [
    "Build main script",
    "Build renderer",
  ]
}

action "Yarn install" {
  uses = "nuxt/actions-yarn@node11"
  args = "install"
}

action "Build main script" {
  uses = "nuxt/actions-yarn@node11"
  needs = ["Yarn install"]
  args = "build:main"
}

action "Build renderer" {
  uses = "nuxt/actions-yarn@node11"
  needs = ["Yarn install"]
  args = "build:render"
}
