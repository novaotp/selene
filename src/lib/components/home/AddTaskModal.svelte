<script lang="ts">
    import { Input, Label, Select } from "$ui/forms";
    import { flyAndScale } from "$utils/transitions/fly-and-scale";

    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
</script>

<article transition:flyAndScale class="relative z-10 flex max-h-[80%] w-full flex-col bg-zinc-900">
    <form>
        <Label.Root>
            <Label.Text for="title">Title</Label.Text>
            <Input id="title" name="title" placeholder="Enter a title..." />
        </Label.Root>
        <Label.Root>
            <Label.Text for="description">Description</Label.Text>
            <Input id="description" name="description" placeholder="Enter a description..." />
        </Label.Root>
        <Label.Root>
            <Label.Text for="deadline">Due Date</Label.Text>
            <Input id="dueDate" name="dueDate" type="date" />
        </Label.Root>
        <Label.Root>
            <Label.Text for="priority">Priority</Label.Text>
            <Select.Root>
                <Select.Option selected disabled>Select a priority</Select.Option>
                <Select.Option value="none">None</Select.Option>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
            </Select.Root>
        </Label.Root>
    </form>
</article>
