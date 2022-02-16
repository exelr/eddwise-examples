# Examples

All the code in the examples is already generated and implemented.

You can start any module with:

```shell
cd pingpong
go run pingpong/cmd/pingpong
```

Just replace `pingpong` with the example you want to test or, if you are in the example directory, just run:

```shell
project=$(basename $(pwd)); go run ${project}/cmd/${project}
```

Then you can open in a browser `https://localhost:3000/web/pingpong/app.html`. If you start a different example,
just change `pingpong` with the project directory.

## Generate code from scratch

If you want to generate code or implement business logic, just keep the `design/design.edd.yaml` and follow the instruction in [eddwise README](https://github.com/exelr/eddwise)


