'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { roles } from '../data/data'
import { type User } from '../data/schema'

type UserForm = {
  firstName: string
  lastName: string
  username: string
  phoneNumber: string
  email: string
  password: string
  role: string
  confirmPassword: string
  isEdit: boolean
}

type UserActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UserActionDialogProps) {
  const isEdit = !!currentRow
  const { t } = useTranslation('users')
  const formSchema = z
    .object({
      firstName: z
        .string()
        .min(1, t('dialogs.action.validation.firstNameRequired')),
      lastName: z
        .string()
        .min(1, t('dialogs.action.validation.lastNameRequired')),
      username: z
        .string()
        .min(1, t('dialogs.action.validation.usernameRequired')),
      phoneNumber: z
        .string()
        .min(1, t('dialogs.action.validation.phoneNumberRequired')),
      email: z.email({
        error: (iss) =>
          iss.input === ''
            ? t('dialogs.action.validation.emailRequired')
            : undefined,
      }),
      password: z.string().transform((pwd) => pwd.trim()),
      role: z.string().min(1, t('dialogs.action.validation.roleRequired')),
      confirmPassword: z.string().transform((pwd) => pwd.trim()),
      isEdit: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.isEdit && !data.password) return true
        return data.password.length > 0
      },
      {
        message: t('dialogs.action.validation.passwordRequired'),
        path: ['password'],
      }
    )
    .refine(
      ({ isEdit, password }) => {
        if (isEdit && !password) return true
        return password.length >= 8
      },
      {
        message: t('dialogs.action.validation.passwordMin'),
        path: ['password'],
      }
    )
    .refine(
      ({ isEdit, password }) => {
        if (isEdit && !password) return true
        return /[a-z]/.test(password)
      },
      {
        message: t('dialogs.action.validation.passwordLowercase'),
        path: ['password'],
      }
    )
    .refine(
      ({ isEdit, password }) => {
        if (isEdit && !password) return true
        return /\d/.test(password)
      },
      {
        message: t('dialogs.action.validation.passwordNumber'),
        path: ['password'],
      }
    )
    .refine(
      ({ isEdit, password, confirmPassword }) => {
        if (isEdit && !password) return true
        return password === confirmPassword
      },
      {
        message: t('dialogs.action.validation.passwordMismatch'),
        path: ['confirmPassword'],
      }
    )
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: '',
          confirmPassword: '',
          isEdit,
        }
      : {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          role: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  const onSubmit = (values: UserForm) => {
    form.reset()
    showSubmittedData(values, t('dialogs.action.submittedTitle'))
    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit
              ? t('dialogs.action.editTitle')
              : t('dialogs.action.addTitle')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialogs.action.editDescription')
              : t('dialogs.action.addDescription')}{' '}
            {t('dialogs.action.saveHint')}
          </DialogDescription>
        </DialogHeader>
        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'dialogs.action.fields.firstNamePlaceholder'
                        )}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'dialogs.action.fields.lastNamePlaceholder'
                        )}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.username')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'dialogs.action.fields.usernamePlaceholder'
                        )}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'dialogs.action.fields.emailPlaceholder'
                        )}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.phoneNumber')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'dialogs.action.fields.phoneNumberPlaceholder'
                        )}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.role')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('dialogs.action.fields.rolePlaceholder')}
                      className='col-span-4'
                      items={roles.map(({ labelKey, value }) => ({
                        label: t(labelKey as never),
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.password')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t(
                          'dialogs.action.fields.passwordPlaceholder'
                        )}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('dialogs.action.fields.confirmPassword')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder={t(
                          'dialogs.action.fields.passwordPlaceholder'
                        )}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            {t('actions.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
