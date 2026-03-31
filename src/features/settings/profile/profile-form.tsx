import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type ProfileFormValues = {
  username: string
  email: string
  bio: string
  urls?: { value: string }[]
}

const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
}

export function ProfileForm() {
  const { t } = useTranslation('settings')

  const profileFormSchema = z.object({
    username: z
      .string()
      .min(1, t('profileForm.validation.usernameRequired'))
      .min(2, t('profileForm.validation.usernameMin'))
      .max(30, t('profileForm.validation.usernameMax')),
    email: z
      .string()
      .min(1, t('profileForm.validation.emailRequired'))
      .email(t('profileForm.validation.emailRequired')),
    bio: z
      .string()
      .min(4, t('profileForm.validation.bioMin'))
      .max(160, t('profileForm.validation.bioMax')),
    urls: z
      .array(
        z.object({
          value: z.string().url(t('profileForm.validation.urlInvalid')),
        })
      )
      .optional(),
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profileForm.username')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('profileForm.usernamePlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('profileForm.usernameDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profileForm.email')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('profileForm.emailPlaceholder')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t('profileForm.emailDescriptionPrefix')}{' '}
                <Link to='/'>{t('profileForm.emailDescriptionLink')}</Link>
                {t('profileForm.emailDescriptionSuffix')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profileForm.bio')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('profileForm.bioPlaceholder')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('profileForm.bioDescriptionPrefix')}{' '}
                <span>{t('profileForm.bioDescriptionMention')}</span>{' '}
                {t('profileForm.bioDescriptionSuffix')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    {t('profileForm.urls')}
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    {t('profileForm.urlsDescription')}
                  </FormDescription>
                  <FormControl className={cn(index !== 0 && 'mt-1.5')}>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            {t('actions.addUrl')}
          </Button>
        </div>
        <Button type='submit'>{t('actions.updateProfile')}</Button>
      </form>
    </Form>
  )
}
