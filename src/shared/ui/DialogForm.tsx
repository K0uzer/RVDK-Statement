import * as React from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/shared/ui'
import { Button } from '@/shared/ui'
import { Textarea } from '@/shared/ui'

export default function DialogForm() {
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState('')

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Написать заявление</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Заявление</DialogTitle>
                    <DialogDescription>
                        Напишите ваше заявление в текстовом поле ниже.
                    </DialogDescription>
                </DialogHeader>

                <Textarea
                    className="h-40 resize-none my-4"
                    placeholder="Введите текст заявления..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
