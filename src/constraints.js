import {
  validateIsBoolean,
  validateIsPlainObject,
  validateIsArrayOf,
} from 'folktale-validations'
import validateIsNumberOrPx from './validations/validators/validateIsNumberOrPx'
import validateBreakpointMapNames from './validations/validators/validateBreakpointMapNames'
import validateIsValidDimensionsUnit from './validations/validators/validateIsValidDimensionsUnit'
import validateIsValidMediaType from './validations/validators/validateIsValidMediaType'
import validateIsDimension from './validations/validators/validateIsDimension'
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber'
import { MEDIA_TYPES, UNITS } from './const'
import validateIsResolution from './validations/validators/validateIsResolution'
import validateIsAspectRatio from './validations/validators/validateIsAspectRatio'
import validateIsNonNegativeValidInteger from './validations/validators/validateIsNonNegativeValidInteger'
import validateIsWhitelistedValue from 'folktale-validations/lib/validators/other/validateIsWhitelistedValue'

// -----------------------------------------------------------------------------
// Constraints for config obj
// -----------------------------------------------------------------------------

export const CONFIG = {
  fields: [
    {
      name: `baseFontSize`,
      validator: validateIsNumberOrPx,
      transformer: numberOrPxNumberToNumber,
      defaultValue: 16,
    },
    {
      name: `defaultMediaType`,
      validator: validateIsValidMediaType,
      defaultValue: MEDIA_TYPES.SCREEN,
    },
    {
      name: `dimensionsUnit`,
      validator: validateIsValidDimensionsUnit,
      defaultValue: UNITS.DIMENSIONS.EM,
    },
    {
      name: `shouldSeparateQueries`,
      validator: validateIsBoolean,
      defaultValue: true,
    },
    {
      name: `onlyNamedBreakpoints`,
      validator: validateIsBoolean,
      defaultValue: true,
    },
  ],
}

export const BREAKPOINTS = {
  fieldsValidator: validateBreakpointMapNames,
  fields: [
    {
      name: `width`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsDimension,
          },
        ],
      },
    },
    {
      name: `height`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsDimension,
          },
        ],
      },
    },
    {
      name: `resolution`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsResolution,
          },
        ],
      },
    },
    {
      name: `aspectRatio`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsAspectRatio,
          },
        ],
      },
    },
    {
      name: `color`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsNonNegativeValidInteger,
          },
        ],
      },
    },
    {
      name: `colorIndex`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsNonNegativeValidInteger,
          },
        ],
      },
    },
    {
      name: `monochrome`,
      validator: validateIsPlainObject,
      value: {
        whitelistKeys: false,
        fields: [
          {
            name: /.*/,
            validator: validateIsNonNegativeValidInteger,
          },
        ],
      },
    },
  ],
}

// -----------------------------------------------------------------------------
// Connfiguration
// -----------------------------------------------------------------------------

export const MQ_ARGS = {
  fields: [
    {
      name: `config`,
      validator: validateIsPlainObject,
      defaultValue: {},
      value: CONFIG,
    },
    {
      name: `breakpoints`,
      validator: validateIsPlainObject,
      defaultValue: {},
      value: BREAKPOINTS,
    },
    {
      name: `originalMQ`,
      validator: validateIsPlainObject,
    },
  ],
}

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

export const API_MEDIA_TYPE = {
  fields: [
    {
      name: `mediaTypes`,
      validator: validateIsArrayOf(validateIsValidMediaType),
    },
  ],
}

// -----------------------------------------------------------------------------
// Linear Features
// -----------------------------------------------------------------------------

export const constraintsForLinearFeature = (
  validValues,
  isRequired = true
) => ({
  fields: [
    {
      name: `value`,
      validator: validateIsWhitelistedValue(validValues),
      isRequired,
    },
  ],
})
