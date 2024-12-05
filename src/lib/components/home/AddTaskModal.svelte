<script lang="ts">
    import { Input, Label } from "$ui/forms";

    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
</script>

<article class="relative flex max-h-[80%] w-full flex-col">
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
        </Label.Root>
    </form>
</article>
