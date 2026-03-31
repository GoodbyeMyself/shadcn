import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { labels, priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'

type TaskMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

type TaskForm = {
  title: string
  status: string
  label: string
  priority: string
}

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  const isUpdate = !!currentRow
  const { t } = useTranslation('tasks')
  const formSchema = z.object({
    title: z.string().min(1, t('dialogs.mutate.validation.titleRequired')),
    status: z.string().min(1, t('dialogs.mutate.validation.statusRequired')),
    label: z.string().min(1, t('dialogs.mutate.validation.labelRequired')),
    priority: z
      .string()
      .min(1, t('dialogs.mutate.validation.priorityRequired')),
  })

  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  const onSubmit = (data: TaskForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    showSubmittedData(data, t('dialogs.mutate.submittedTitle'))
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>
            {isUpdate
              ? t('dialogs.mutate.updateTitle')
              : t('dialogs.mutate.createTitle')}
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? t('dialogs.mutate.updateDescription')
              : t('dialogs.mutate.createDescription')}{' '}
            {t('dialogs.mutate.saveHint')}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialogs.mutate.fields.title')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('dialogs.mutate.fields.titlePlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialogs.mutate.fields.status')}</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('dialogs.mutate.fields.statusPlaceholder')}
                    items={statuses.map((status) => ({
                      label: t(status.labelKey as never),
                      value: status.value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>{t('dialogs.mutate.fields.label')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {labels.map((label) => (
                        <FormItem
                          key={label.value}
                          className='flex items-center'
                        >
                          <FormControl>
                            <RadioGroupItem value={label.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {t(label.labelKey as never)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>{t('dialogs.mutate.fields.priority')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {priorities
                        .filter((priority) => priority.value !== 'critical')
                        .reverse()
                        .map((priority) => (
                          <FormItem
                            key={priority.value}
                            className='flex items-center'
                          >
                            <FormControl>
                              <RadioGroupItem value={priority.value} />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {t(priority.labelKey as never)}
                            </FormLabel>
                          </FormItem>
                        ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>{t('actions.close')}</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            {t('actions.saveChanges')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
