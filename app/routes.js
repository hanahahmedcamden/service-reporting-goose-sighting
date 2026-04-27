const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/permit/start', (req, res) => {
  res.render('permit/start')
})

router.get('/permit/address', (req, res) => {
  res.render('permit/address')
})

router.post('/permit/address', (req, res) => {
  const { addressLine1, postcode } = req.body
  const errors = {}

  if (!addressLine1 || !addressLine1.trim()) {
    errors.addressLine1 = 'Enter the first line of your address'
  }

  if (!postcode || !postcode.trim()) {
    errors.postcode = 'Enter your postcode'
  }

  if (Object.keys(errors).length) {
    return res.status(422).render('permit/address', {
      errors,
      errorList: Object.entries(errors).map(([field, text]) => ({
        href: `#${field}`,
        text
      }))
    })
  }

  req.session.data.addressLine1 = addressLine1.trim()
  req.session.data.addressLine2 = req.body.addressLine2 && req.body.addressLine2.trim()
  req.session.data.postcode = postcode.trim().toUpperCase()

  res.redirect('/permit/check-answers')
})

router.get('/permit/check-answers', (req, res) => {
  res.render('permit/check-answers')
})

router.post('/permit/check-answers', (req, res) => {
  res.redirect('/permit/confirmation')
})

router.get('/permit/confirmation', (req, res) => {
  res.render('permit/confirmation')
})

router.get('/complaints', (req, res) => {
  res.redirect('/complaints/who-for')
})

router.get('/complaints/who-for', (req, res) => {
  res.render('complaints/who-for')
})

router.post('/complaints/who-for', (req, res) => {
  req.session.data.complaintFor = req.body.complaintFor || 'myself'
  req.session.data.hasPermission = req.body.hasPermission
  req.session.data.permissionDocument = req.body.complaintFor === 'someone-else' ? 'No file chosen' : undefined
  res.redirect('/complaints/service')
})

router.get('/complaints/service', (req, res) => {
  res.render('complaints/service')
})

router.post('/complaints/service', (req, res) => {
  req.session.data.service = req.body.service

  if (req.body.service === 'Community safety') {
    return res.redirect('/complaints/community-safety')
  }

  res.redirect('/complaints/previous-complaint')
})

router.get('/complaints/community-safety', (req, res) => {
  req.session.data.service = req.session.data.service || 'Community safety'
  res.render('complaints/community-safety')
})

router.post('/complaints/community-safety', (req, res) => {
  req.session.data.service = 'Community safety'
  req.session.data.communitySafetyArea = req.body.communitySafetyArea
  req.session.data.communitySafetyOther = req.body.communitySafetyOther
  res.redirect('/complaints/previous-complaint')
})

router.get('/complaints/previous-complaint', (req, res) => {
  res.render('complaints/previous-complaint')
})

router.post('/complaints/previous-complaint', (req, res) => {
  req.session.data.previousComplaint = req.body.previousComplaint || 'no'
  req.session.data.previousComplaintReference = req.body.previousComplaintReference
  res.redirect('/complaints/your-details')
})

router.get('/complaints/your-details', (req, res) => {
  res.render('complaints/your-details')
})

router.post('/complaints/your-details', (req, res) => {
  Object.assign(req.session.data, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    townOrCity: req.body.townOrCity,
    county: req.body.county,
    postcode: req.body.postcode,
    email: req.body.email,
    phone: req.body.phone,
    responseMethods: Array.isArray(req.body.responseMethods)
      ? req.body.responseMethods
      : req.body.responseMethods ? [req.body.responseMethods] : []
  })

  res.redirect('/complaints/complaint-details')
})

router.get('/complaints/complaint-details', (req, res) => {
  res.render('complaints/complaint-details')
})

router.post('/complaints/complaint-details', (req, res) => {
  Object.assign(req.session.data, {
    complaintDescription: req.body.complaintDescription,
    incidentDate: req.body.incidentDate,
    impact: req.body.impact,
    desiredOutcome: req.body.desiredOutcome
  })

  res.redirect('/complaints/supporting-documents')
})

router.get('/complaints/supporting-documents', (req, res) => {
  res.render('complaints/supporting-documents')
})

router.post('/complaints/supporting-documents', (req, res) => {
  req.session.data.supportingDocument = 'file.pdf'
  res.redirect('/complaints/reasonable-adjustments')
})

router.get('/complaints/reasonable-adjustments', (req, res) => {
  res.render('complaints/reasonable-adjustments')
})

router.post('/complaints/reasonable-adjustments', (req, res) => {
  req.session.data.needsAdjustments = req.body.needsAdjustments || 'no'
  req.session.data.adjustmentsDetails = req.body.adjustmentsDetails
  res.redirect('/complaints/confirmation')
})

router.get('/complaints/confirmation', (req, res) => {
  res.render('complaints/confirmation')
})

router.post('/clear-data', (req, res) => {
  req.session.data = {}
  res.redirect('/')
})

module.exports = router
