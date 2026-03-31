import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MailPlus, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { roles } from '../data/data'

type UserInviteForm = {
  email: string
  role: string
  desc?: string
}

type UserInviteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({
  open,
  onOpenChange,
}: UserInviteDialogProps) {
  const { t } = useTranslation('users')
  const formSchema = z.object({
    email: z.email({
      error: (iss) =>
        iss.input === ''
          ? t('dialogs.invite.validation.emailRequired')
          : undefined,
    }),
    role: z.string().min(1, t('dialogs.invite.validation.roleRequired')),
    desc: z.string().optional(),
  })

  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', role: '', desc: '' },
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values, t('dialogs.invite.submittedTitle'))
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-start'>
          <DialogTitle className='flex items-center gap-2'>
            <MailPlus /> {t('dialogs.invite.title')}
          </DialogTitle>
          <DialogDescription>
            {t('dialogs.invite.description')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='user-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialogs.invite.fields.email')}</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder={t('dialogs.invite.fields.emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('dialogs.invite.fields.role')}</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('dialogs.invite.fields.rolePlaceholder')}
                    items={roles.map(({ labelKey, value }) => ({
                      label: t(labelKey as never),
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='desc'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>
                    {t('dialogs.invite.fields.description')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none'
                      placeholder={t(
                        'dialogs.invite.fields.descriptionPlaceholder'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>{t('actions.cancel')}</Button>
          </DialogClose>
          <Button type='submit' form='user-invite-form'>
            {t('actions.invite')} <Send />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
