For this write-up I'll explore a backend application written in GoLang.

For a linter, it seems like golangci-lint is a popular and powerful choice, incorporating several linters that can be ran in parallel on a project.  GoLang offers a built in testing suite and build tool, so go test and go build should be sufficient.

Github actions and Jenkins seem to be the clear market leaders at the moment.  It seems like gitlab offers their own CI/CD platform to compete with actions, and there are some other SaaS options like CircleCI which offers faster CI/CD performance, and Travis CI which seems to be an early player in the space.

Six developers seems, to me, to be best for a cloud hosted setup.  Certainly this is enough people that thought should be given to make a performant and robust CI/CD pipeline to keep productivity high, but it's not a particularly big developer team.