export const styleOption = {
  variables: {
    colorPrimary: '#25355F',
    colorTextSecondary: '#000',
    fontWeight: {
      normal: '400',
      medium: '600',
      bold: '700',
    },
  },
  layout: {
    socialButtonsVariant: 'iconButton',
  },
  elements: {
    card: {
      border: '0.5px solid #000',
      backgroundColor: 'rgb(255 251 235)',
    },
    headerTitle: {
      fontSize: '24px',
    },
    headerSubtitle: {
      fontSize: '0.8125rem',
      fontWeight: 600,
    },
    socialButtonsIconButton: {
      height: '2.5rem',
      border: '0.5px solid #000',
      borderRadius: '0.5rem',

      '&:focus': {
        border: '0.5px solid #000',

        transform: 'scale(1.01)',
      },
      '&:active': {
        border: '0.5px solid #000',
        transform: 'translate(1px)',
      },
    },
    dividerLine: {
      background: '#000',
    },
    formFieldInput: {
      border: '0.5px solid #000',
      backgroundColor: 'rgb(255 251 235)',
      transition: 'all 0.2s ease-in-out',
      padding: '0.6175rem 1rem',
      '&:focus': {
        border: '0.5px solid #000',

        transform: 'scale(1.01)',
      },
    },

    formButtonPrimary: {
      height: '2.5rem',

      border: '0.5px solid #000',
    },
    footer: {
      '& + div': {
        boxShadow: '-4px 1px 0 0 rgba(0,0,0,0.5)',
      },
    },
    footerActionLink: {
      fontWeight: 600,
      borderBottom: '2px solid',
      borderColor: '#25355F',
      '&:focus': {
        boxShadow: 'none',
      },
      '&:hover': {
        textDecorationLine: 'none',
      },
    },
    footerActionText: {
      fontWeight: 600,
    },
    logoImage: {
      filter: 'hue-rotate(140deg)',
    },
  },
}
