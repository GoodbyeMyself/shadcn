import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

type NotificationsFormValues = {
  type: 'all' | 'mentions' | 'none'
  mobile?: boolean
  communication_emails?: boolean
  social_emails?: boolean
  marketing_emails?: boolean
  security_emails: boolean
}

const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
}

export function NotificationsForm() {
  const { t } = useTranslation('settings')

  const notificationsFormSchema = z.object({
    type: z.enum(['all', 'mentions', 'none'], {
      error: (issue) =>
        issue.input === undefined
          ? t('notificationsForm.validation.typeRequired')
          : undefined,
    }),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
  })

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='relative space-y-3'>
              <FormLabel>{t('notificationsForm.notifyMeAbout')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col gap-2'
                >
                  <FormItem className='flex items-center'>
                    <FormControl>
                      <RadioGroupItem value='all' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {t('notificationsForm.allMessages')}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center'>
                    <FormControl>
                      <RadioGroupItem value='mentions' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {t('notificationsForm.mentions')}
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center'>
                    <FormControl>
                      <RadioGroupItem value='none' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      {t('notificationsForm.nothing')}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='relative'>
          <h3 className='mb-4 text-lg font-medium'>
            {t('notificationsForm.emailNotifications')}
          </h3>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='communication_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      {t('notificationsForm.communicationEmails')}
                    </FormLabel>
                    <FormDescription>
                      {t('notificationsForm.communicationEmailsDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='marketing_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      {t('notificationsForm.marketingEmails')}
                    </FormLabel>
                    <FormDescription>
                      {t('notificationsForm.marketingEmailsDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='social_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      {t('notificationsForm.socialEmails')}
                    </FormLabel>
                    <FormDescription>
                      {t('notificationsForm.socialEmailsDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='security_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      {t('notificationsForm.securityEmails')}
                    </FormLabel>
                    <FormDescription>
                      {t('notificationsForm.securityEmailsDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name='mobile'
          render={({ field }) => (
            <FormItem className='relative flex flex-row items-start'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>{t('notificationsForm.mobileTitle')}</FormLabel>
                <FormDescription>
                  {t('notificationsForm.mobileDescriptionPrefix')}{' '}
                  <Link
                    to='/settings'
                    className='underline decoration-dashed underline-offset-4 hover:decoration-solid'
                  >
                    {t('notificationsForm.mobileDescriptionLink')}
                  </Link>{' '}
                  {t('notificationsForm.mobileDescriptionSuffix')}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type='submit'>{t('actions.updateNotifications')}</Button>
      </form>
    </Form>
  )
}
