import { getColour, pairingType, btnPrimary } from '../data.js'
import MemberCard from './MemberCard.jsx'

export function GroupCard({ group, allTopics, cloudTopics, aiTopics, onJoin, onPairWith, onRemoveMember, onShowLearning, isLearningActive }) {
  const { topic, members } = group
  const colour = getColour(topic, allTopics)
  const category = cloudTopics.includes(topic) ? 'Cloud' : aiTopics.includes(topic) ? 'AI' : 'Custom'
  const catStyle = {
    Cloud:  { bg: '#eff6ff', text: '#1d4ed8' },
    AI:     { bg: '#f5f3ff', text: '#6d28d9' },
    Custom: { bg: '#f0fdf4', text: '#15803d' },
  }[category]

  const isSingle = members.length === 1
  const actionLabel = isSingle ? 'PAIR UP ›' : 'JOIN THIS GROUP ›'
  const subtitle = isSingle ? 'Looking to pair' : pairingType(members)

  function handleAction() {
    if (isSingle) {
      onPairWith({ id: group.id, name: members[0].name, topic, level: members[0].level })
    } else {
      onJoin(group)
    }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid #f3f4f6', flexWrap: 'wrap' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: colour, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: catStyle.bg, color: catStyle.text, flexShrink: 0 }}>{category}</span>
        <span style={{ fontWeight: 700, fontSize: 14, color: '#111827', flex: 1, minWidth: 60 }}>{topic}</span>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={onShowLearning}
            style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
              border: isLearningActive ? '1.5px solid #fc4c02' : '1.5px solid #d1d5db',
              background: isLearningActive ? '#fff3ee' : '#fff',
              color: isLearningActive ? '#fc4c02' : '#374151',
            }}
          >
            VIEW SUGGESTED LEARNING ›
          </button>
          <button onClick={handleAction} style={{ ...btnPrimary, fontSize: 11, padding: '4px 10px' }}>
            {actionLabel}
          </button>
        </div>
      </div>
      <div style={{ padding: '10px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {members.map((member, mi) => (
            <MemberCard key={mi} member={member} onRemove={() => onRemoveMember(group.id, mi)} />
          ))}
        </div>
      </div>
    </div>
  )
}
