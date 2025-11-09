This is a CLI program for managing tasks.

### Supported functions:
- adding
- updating description
- deleting
- viewing all tasks and tasks filtered by status
- changing statuses

### Supported statuses:
- todo (default status)
- in-progress
- done

### Examples of program usage:
- `ts-node main.ts add "Some description of task"`
- `ts-node main.ts update 1 "Description 2"`
- `ts-node main.ts delete 1`
- `ts-node main.ts list`
- `ts-node main.ts list done`
- `ts-node main.ts todo 1`
- `ts-node main.ts in-progress 1`
- `ts-node main.ts done 1`
