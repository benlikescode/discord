type Audit = {
  avatar: string
  label1: string
  label2: string
  action: 'Ban' | 'RemovedBan' | 'Kick' | 'Invite' | 'CreatedText' | 'CreatedVoice' | 'CreatedRole' | 'RemovedRole'
  iconType: 'Create' | 'Delete' | 'Update'
  timestamp: string
  hasDropdown?: boolean
  banReason?: string
}

export default Audit