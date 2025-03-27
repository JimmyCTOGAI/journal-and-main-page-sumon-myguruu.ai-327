import React from 'react'

const CHARACTERS = [
  {
    name: 'Jen',
    image: 'https://bptsaimcgsnzsuwperoi.supabase.co/storage/v1/object/sign/media/logo/Guruu%20Jen%20Head.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9sb2dvL0d1cnV1IEplbiBIZWFkLnBuZyIsImlhdCI6MTc0MzAwNjg1MywiZXhwIjoyMDU4MzY2ODUzfQ.epMtRR-cN7XqB8i8r68MFd7OzyoaBtN1CDCFBF3EpjY'
  },
  {
    name: 'Dwayne',
    image: 'https://bptsaimcgsnzsuwperoi.supabase.co/storage/v1/object/sign/media/logo/Guruu%20Dr.%20Head.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9sb2dvL0d1cnV1IERyLiBIZWFkLnBuZyIsImlhdCI6MTc0MzAwNzQxNSwiZXhwIjoyMDU4MzY3NDE1fQ.BId9JTP0EYay1FB3plfg0kP-FggugqG8zPU2sKh68Lo'
  },
  {
    name: 'Oz',
    image: 'https://bptsaimcgsnzsuwperoi.supabase.co/storage/v1/object/sign/media/logo/Guruu%20Oz%20Head.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9sb2dvL0d1cnV1IE96IEhlYWQucG5nIiwiaWF0IjoxNzQzMDA3NTMxLCJleHAiOjIwNTgzNjc1MzF9.hqhIuruPF-rn9O7Iz0CDH1F9t6t_Od7PntuoUchBCi0'
  },
  {
    name: 'Ryan',
    image: 'https://bptsaimcgsnzsuwperoi.supabase.co/storage/v1/object/sign/media/logo/Guruu%20Ryan%20Head.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9sb2dvL0d1cnV1IFJ5YW4gSGVhZC5wbmciLCJpYXQiOjE3NDMwMDc1OTksImV4cCI6MjA1ODM2NzU5OX0.2ax8CqBpKkA6fxLXig9rfnNj5fx-tUDyqQA834zNL1s'
  }
]

const LOGO_URL = 'https://bptsaimcgsnzsuwperoi.supabase.co/storage/v1/object/sign/media/icons/My%20Guruuz.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtZWRpYS9pY29ucy9NeSBHdXJ1dXoucG5nIiwiaWF0IjoxNzQzMDA2NTUxLCJleHAiOjIwNTgzNjY1NTF9.x7xjhcvf_TKTS09r5du3zQtzznVoWcTv1E2V-E2QIYs'

export function CharacterIcons() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {/* Top row characters */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <img 
              src={CHARACTERS[0].image} 
              alt={CHARACTERS[0].name} 
              className="w-16 h-16 rounded-full" 
              loading="lazy"
            />
            <p className="mt-1 text-sm text-gray-600">{CHARACTERS[0].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <img 
              src={CHARACTERS[1].image} 
              alt={CHARACTERS[1].name} 
              className="w-16 h-16 rounded-full" 
              loading="lazy"
            />
            <p className="mt-1 text-sm text-gray-600">{CHARACTERS[1].name}</p>
          </div>
        </div>
        
        {/* Center logo */}
        <div className="col-span-2 flex justify-center items-center py-2">
          <img 
            src={LOGO_URL} 
            alt="MyGuruu" 
            className="h-[75px] object-contain" 
            loading="lazy"
          />
        </div>
        
        {/* Bottom row characters */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <img 
              src={CHARACTERS[2].image} 
              alt={CHARACTERS[2].name} 
              className="w-16 h-16 rounded-full" 
              loading="lazy"
            />
            <p className="mt-1 text-sm text-gray-600">{CHARACTERS[2].name}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <img 
              src={CHARACTERS[3].image} 
              alt={CHARACTERS[3].name} 
              className="w-16 h-16 rounded-full" 
              loading="lazy"
            />
            <p className="mt-1 text-sm text-gray-600">{CHARACTERS[3].name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}